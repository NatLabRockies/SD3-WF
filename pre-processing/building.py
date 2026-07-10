from pathlib import Path
from os import PathLike
import pandas as pd
from constants import (
    START_YEAR,
    START_MONTH,
    START_DAY,
    START_HOUR,
    START_MINUTE,
    END_HOUR,
    END_MINUTE,
)


class Building:
    def __init__(self, path: PathLike):
        path = Path(path)
        sim_csv_path = list(path.glob("**/sim.csv"))[0]
        # print(f"Loading '{sim_csv_path}'")
        data = pd.read_csv(sim_csv_path)
        time_series = pd.to_datetime(
            data["Date/Time"],
            format="%m/%d  %H:%M:%S",
            exact=False,
        ).map(
            lambda time: time.replace(year=START_YEAR, month=START_MONTH, day=START_DAY)
        )
        beginning = time_series.iloc[0]
        start_time = beginning.replace(hour=START_HOUR, minute=START_MINUTE)
        end_time = beginning.replace(hour=END_HOUR, minute=END_MINUTE)
        data["Date/Time"] = time_series
        data.set_index("Date/Time", inplace=True, drop=True)
        self.data = data[(data.index >= start_time) & (data.index <= end_time)]

    @property
    def battery_active_power(self):
        """Active Power in Watts"""
        return (
            self.data["Battery Active Power:PythonPlugin:OutputVariable [](TimeStep)"]
            / 1000
            * -1
        )

    @property
    def battery_reactive_power(self):
        """Reactive Power in Watts"""
        return (
            self.data["Battery Reactive Power:PythonPlugin:OutputVariable [](TimeStep)"]
            / 1000
            * -1
        )

    @property
    def battery_mode(self):
        """Operating mode index: 0=idle, 1=discharging, 2=charging"""
        return self.data["BATTERY:Electric Storage Operating Mode Index [](TimeStep)"]

    @property
    def battery_state_of_charge(self):
        """State of charge as a 0–1 fraction"""
        return self.data["BATTERY:Electric Storage Charge Fraction [](TimeStep)"]

    @property
    def battery_received_signal(self):
        """EMS setChargeDischargeRate command value received by battery"""
        return self.data["EMS:setChargeDischargeRate_EMS_Value [](TimeStep)"]

    @property
    def facility_net_power(self):
        return self.data["EMS:EMS_ElectricityNet_Facility_Wh [](TimeStep)"] * 60 / 1000

    @property
    def facility_power(self):
        return self.data["EMS:EMS_Electricity_Facility_Wh [](TimeStep)"] * 60 / 1000

    @property
    def facility_purchased_power(self):
        return (
            self.data["EMS:EMS_ElectricityPurchased_Facility_Wh [](TimeStep)"]
            * 60
            / 1000
        )

    @property
    def facility_surplus_power(self):
        return (
            self.data["EMS:EMS_ElectricitySurplusSold_Facility_Wh [](TimeStep)"]
            * 60
            / 1000
        )

    @property
    def facility_active_power(self):
        return (
            self.data["Total Active Power:PythonPlugin:OutputVariable [](TimeStep)"]
            / 1000
        )

    @property
    def facility_reactive_power(self):
        return (
            self.data["Total Reactive Power:PythonPlugin:OutputVariable [](TimeStep)"]
            / 1000
        )

    def facility_timeseries(self, start_timestamp: "pd.Timestamp") -> "pd.DataFrame":
        """Return a DataFrame with seconds-since-start as index and 5 battery columns.

        Columns: received_signal, status (int 0/1/2), state_of_charge,
                 active_power, reactive_power
        """
        df = pd.DataFrame(
            {
                "power": self.facility_power,
                "net_power": self.facility_net_power,
                "purchased_power": self.facility_purchased_power,
                "surplus_power": self.facility_surplus_power,
            }
        )
        df.index = (df.index - start_timestamp).total_seconds()
        return df

    def battery_timeseries(self, start_timestamp: "pd.Timestamp") -> "pd.DataFrame":
        """Return a DataFrame with seconds-since-start as index and 5 battery columns.

        Columns: received_signal, status (int 0/1/2), state_of_charge,
                 active_power, reactive_power
        """
        df = pd.DataFrame(
            {
                "received_signal": self.battery_received_signal,
                "status": self.battery_mode,
                "state_of_charge": self.battery_state_of_charge,
                "active_power": self.battery_active_power,
                "reactive_power": self.battery_reactive_power,
            }
        )
        df.index = (df.index - start_timestamp).total_seconds()
        return df


BUILDING_EXPORTS = [
    (
        "EMS:EMS_ElectricityNet_Facility_Wh [](TimeStep)",
        "EMS:EMS_ElectricityNet_Facility_Wh",
    ),
    (
        "EMS:EMS_ElectricityPurchased_Facility_Wh [](TimeStep)",
        "EMS:EMS_ElectricityPurchased_Facility_Wh",
    ),
    (
        "EMS:EMS_ElectricitySurplusSold_Facility_Wh [](TimeStep)",
        "EMS:EMS_ElectricitySurplusSold_Facility_Wh",
    ),
    (
        "EMS:EMS_Electricity_Building_Wh [](TimeStep)",
        "EMS:EMS_Electricity_Building_Wh",
    ),
    (
        "EMS:EMS_Electricity_Facility_Wh [](TimeStep)",
        "EMS:EMS_Electricity_Facility_Wh",
    ),
    (
        "EMS:EMS_FacilityNetPurchasedElectricityEnergy_J [](TimeStep)",
        "EMS:EMS_FacilityNetPurchasedElectricityEnergy_J",
    ),
    (
        "EMS:EMS_FacilityNetPurchasedElectricityEnergy_Wh [](TimeStep)",
        "EMS:EMS_FacilityNetPurchasedElectricityEnergy_Wh",
    ),
    (
        "EMS:EMS_FacilityTotalProducedElectricityEnergy_J [](TimeStep)",
        "EMS:EMS_FacilityTotalProducedElectricityEnergy_J",
    ),
    (
        "EMS:EMS_FacilityTotalProducedElectricityEnergy_Wh [](TimeStep)",
        "EMS:EMS_FacilityTotalProducedElectricityEnergy_Wh",
    ),
    (
        "EMS:EMS_FacilityTotalPurchasedElectricityEnergy_J [](TimeStep)",
        "EMS:EMS_FacilityTotalPurchasedElectricityEnergy_J",
    ),
    (
        "EMS:EMS_FacilityTotalPurchasedElectricityEnergy_Wh [](TimeStep)",
        "EMS:EMS_FacilityTotalPurchasedElectricityEnergy_Wh",
    ),
    (
        "EMS:EMS_FacilityTotalSurplusElectricityEnergy_J [](TimeStep)",
        "EMS:EMS_FacilityTotalSurplusElectricityEnergy_J",
    ),
    (
        "EMS:EMS_FacilityTotalSurplusElectricityEnergy_Wh [](TimeStep)",
        "EMS:EMS_FacilityTotalSurplusElectricityEnergy_Wh",
    ),
    (
        "EMS:setChargeDischargeRate_EMS_Value [](TimeStep)",
        "EMS:setChargeDischargeRate_EMS_Value",
    ),
    (
        "EMS:setChargeDischargeRate_Enable_EMS_Value [](TimeStep)",
        "EMS:setChargeDischargeRate_Enable_EMS_Value",
    ),
    ("EMS:setPF_EMS_Value [](TimeStep)", "EMS:setPF_EMS_Value"),
    (
        "EMS:setPF_Enable_EMS_Value [](TimeStep)",
        "EMS:setPF_Enable_EMS_Value",
    ),
    ("EMS:Voltage_EMS_Value [](TimeStep)", "EMS:Voltage_EMS_Value"),
    (
        "EMS:Voltage_Enable_EMS_Value [](TimeStep)",
        "EMS:Voltage_Enable_EMS_Value",
    ),
    (
        "EMS:Battery Minimum State of Charge [](TimeStep)",
        "EMS:Battery Minimum State of Charge",
    ),
    (
        "EMS:Battery Nameplate Charge Rate [](TimeStep)",
        "EMS:Battery Nameplate Charge Rate",
    ),
    (
        "EMS:Battery Nameplate Discharge Rate [](TimeStep)",
        "EMS:Battery Nameplate Discharge Rate",
    ),
    (
        "EMS:Battery Nameplate Capacity [](TimeStep)",
        "EMS:Battery Nameplate Capacity",
    ),
    (
        "EMS:Battery Discharge Energy [](TimeStep)",
        "EMS:Battery Discharge Energy",
    ),
    (
        "EMS:Battery Charge Energy [](TimeStep)",
        "EMS:Battery Charge Energy",
    ),
    ("EMS:Battery Net Energy [](TimeStep)", "EMS:Battery Net Energy"),
    ("EMS:Battery Charge State [](TimeStep)", "EMS:Battery Charge State"),
    (
        "EMS:Facility Electricity Produced [](TimeStep)",
        "EMS:Facility Electricity Produced",
    ),
    (
        "AIR SOURCE HEAT PUMP AIRLOOP RET AIR ZONE:Zone Mean Air Temperature [C](TimeStep)",
        "AIR SOURCE HEAT PUMP AIRLOOP RET AIR ZONE:Zone Mean Air Temperature",
    ),
    (
        "AIR SOURCE HEAT PUMP AIRLOOP RET AIR ZONE:Zone Operative Temperature [C](TimeStep)",
        "AIR SOURCE HEAT PUMP AIRLOOP RET AIR ZONE:Zone Operative Temperature",
    ),
    (
        "ATTIC - VENTED:Zone Mean Air Temperature [C](TimeStep)",
        "ATTIC - VENTED:Zone Mean Air Temperature",
    ),
    (
        "ATTIC - VENTED:Zone Operative Temperature [C](TimeStep)",
        "ATTIC - VENTED:Zone Operative Temperature",
    ),
    (
        "CONDITIONED SPACE:Zone Mean Air Temperature [C](TimeStep)",
        "CONDITIONED SPACE:Zone Mean Air Temperature",
    ),
    (
        "CONDITIONED SPACE:Zone Operative Temperature [C](TimeStep)",
        "CONDITIONED SPACE:Zone Operative Temperature",
    ),
    (
        "AIR SOURCE HEAT PUMP AIRLOOP RET AIR ZONE:Zone Air Relative Humidity [%](TimeStep)",
        "AIR SOURCE HEAT PUMP AIRLOOP RET AIR ZONE:Zone Air Relative Humidity",
    ),
    (
        "ATTIC - VENTED:Zone Air Relative Humidity [%](TimeStep)",
        "ATTIC - VENTED:Zone Air Relative Humidity",
    ),
    (
        "CONDITIONED SPACE:Zone Air Relative Humidity [%](TimeStep)",
        "CONDITIONED SPACE:Zone Air Relative Humidity",
    ),
    (
        "BATTERY:Electric Storage Operating Mode Index [](TimeStep)",
        "BATTERY:Electric Storage Operating Mode Index",
    ),
    (
        "BATTERY:Electric Storage Charge Fraction [](TimeStep)",
        "BATTERY:Electric Storage Charge Fraction",
    ),
    (
        "BATTERY:Electric Storage Total Current [A](TimeStep)",
        "BATTERY:Electric Storage Total Current",
    ),
    (
        "BATTERY:Electric Storage Total Voltage [V](TimeStep)",
        "BATTERY:Electric Storage Total Voltage",
    ),
    (
        "BATTERY:Electric Storage Charge Power [W](TimeStep)",
        "BATTERY:Electric Storage Charge Power",
    ),
    (
        "BATTERY:Electric Storage Discharge Power [W](TimeStep)",
        "BATTERY:Electric Storage Discharge Power",
    ),
    (
        "Whole Building:Facility Total Purchased Electricity Energy [J](TimeStep)",
        "Whole Building:Facility Total Purchased Electricity Energy",
    ),
    (
        "Whole Building:Facility Total Surplus Electricity Energy [J](TimeStep)",
        "Whole Building:Facility Total Surplus Electricity Energy",
    ),
    (
        "Whole Building:Facility Net Purchased Electricity Energy [J](TimeStep)",
        "Whole Building:Facility Net Purchased Electricity Energy",
    ),
    (
        "Whole Building:Facility Total Produced Electricity Energy [J](TimeStep)",
        "Whole Building:Facility Total Produced Electricity Energy",
    ),
    (
        "Facility:Facility Thermal Comfort ASHRAE 55 Simple Model Summer or Winter Clothes Not Comfortable Time [hr](TimeStep)",
        "Facility:Facility Thermal Comfort ASHRAE 55 Simple Model Summer or Winter Clothes Not Comfortable Time",
    ),
    (
        "Facility:Facility Heating Setpoint Not Met While Occupied Time [hr](TimeStep)",
        "Facility:Facility Heating Setpoint Not Met While Occupied Time",
    ),
    (
        "Facility:Facility Cooling Setpoint Not Met While Occupied Time [hr](TimeStep)",
        "Facility:Facility Cooling Setpoint Not Met While Occupied Time",
    ),
    (
        "AIR SOURCE HEAT PUMP AIRLOOP RET AIR ZONE:Zone Heat Index [C](TimeStep)",
        "AIR SOURCE HEAT PUMP AIRLOOP RET AIR ZONE:Zone Heat Index",
    ),
    (
        "AIR SOURCE HEAT PUMP AIRLOOP RET AIR ZONE:Zone Humidity Index [](TimeStep)",
        "AIR SOURCE HEAT PUMP AIRLOOP RET AIR ZONE:Zone Humidity Index",
    ),
    (
        "ATTIC - VENTED:Zone Heat Index [C](TimeStep)",
        "ATTIC - VENTED:Zone Heat Index",
    ),
    (
        "ATTIC - VENTED:Zone Humidity Index [](TimeStep)",
        "ATTIC - VENTED:Zone Humidity Index",
    ),
    (
        "CONDITIONED SPACE:Zone Heat Index [C](TimeStep)",
        "CONDITIONED SPACE:Zone Heat Index",
    ),
    (
        "CONDITIONED SPACE:Zone Humidity Index [](TimeStep)",
        "CONDITIONED SPACE:Zone Humidity Index",
    ),
    (
        "HEATING SETPOINT:Schedule Value [](TimeStep)",
        "HEATING SETPOINT:Schedule Value",
    ),
    (
        "COOLING SETPOINT:Schedule Value [](TimeStep)",
        "COOLING SETPOINT:Schedule Value",
    ),
    (
        "NODE 4:System Node Temperature [C](TimeStep)",
        "NODE 4:System Node Temperature",
    ),
    (
        "NODE 4:System Node Mass Flow Rate [kg/s](TimeStep)",
        "NODE 4:System Node Mass Flow Rate",
    ),
    (
        "NODE 4:System Node Relative Humidity [%](TimeStep)",
        "NODE 4:System Node Relative Humidity",
    ),
    (
        "NODE 4:System Node Pressure [Pa](TimeStep)",
        "NODE 4:System Node Pressure",
    ),
    (
        "NODE 1:System Node Setpoint Temperature [C](TimeStep)",
        "NODE 1:System Node Setpoint Temperature",
    ),
    (
        "Battery Active Power:PythonPlugin:OutputVariable [](TimeStep)",
        "Battery Active Power:PythonPlugin:OutputVariable",
    ),
    (
        "Battery Power Factor:PythonPlugin:OutputVariable [](TimeStep)",
        "Battery Power Factor:PythonPlugin:OutputVariable",
    ),
    (
        "Battery Reactive Power:PythonPlugin:OutputVariable [](TimeStep)",
        "Battery Reactive Power:PythonPlugin:OutputVariable",
    ),
    (
        "Building Reactive Power:PythonPlugin:OutputVariable [](TimeStep)",
        "Building Reactive Power:PythonPlugin:OutputVariable",
    ),
    (
        "Cooling Submeter:PythonPlugin:OutputVariable [](TimeStep)",
        "Cooling Submeter:PythonPlugin:OutputVariable",
    ),
    (
        "Exterior Equipment Submeter:PythonPlugin:OutputVariable [](TimeStep)",
        "Exterior Equipment Submeter:PythonPlugin:OutputVariable",
    ),
    (
        "Exterior Lighting Submeter:PythonPlugin:OutputVariable [](TimeStep)",
        "Exterior Lighting Submeter:PythonPlugin:OutputVariable",
    ),
    (
        "Fans Submeter:PythonPlugin:OutputVariable [](TimeStep)",
        "Fans Submeter:PythonPlugin:OutputVariable",
    ),
    (
        "Generators Submeter:PythonPlugin:OutputVariable [](TimeStep)",
        "Generators Submeter:PythonPlugin:OutputVariable",
    ),
    (
        "Heat Recovery Submeter:PythonPlugin:OutputVariable [](TimeStep)",
        "Heat Recovery Submeter:PythonPlugin:OutputVariable",
    ),
    (
        "Heat Rejection Submeter:PythonPlugin:OutputVariable [](TimeStep)",
        "Heat Rejection Submeter:PythonPlugin:OutputVariable",
    ),
    (
        "Heating Submeter:PythonPlugin:OutputVariable [](TimeStep)",
        "Heating Submeter:PythonPlugin:OutputVariable",
    ),
    (
        "Humidification Submeter:PythonPlugin:OutputVariable [](TimeStep)",
        "Humidification Submeter:PythonPlugin:OutputVariable",
    ),
    (
        "Interior Equipment Submeter:PythonPlugin:OutputVariable [](TimeStep)",
        "Interior Equipment Submeter:PythonPlugin:OutputVariable",
    ),
    (
        "Interior Lighting Submeter:PythonPlugin:OutputVariable [](TimeStep)",
        "Interior Lighting Submeter:PythonPlugin:OutputVariable",
    ),
    (
        "Pumps Submeter:PythonPlugin:OutputVariable [](TimeStep)",
        "Pumps Submeter:PythonPlugin:OutputVariable",
    ),
    (
        "Refrigeration Submeter:PythonPlugin:OutputVariable [](TimeStep)",
        "Refrigeration Submeter:PythonPlugin:OutputVariable",
    ),
    (
        "Service Water Heating Submeter:PythonPlugin:OutputVariable [](TimeStep)",
        "Service Water Heating Submeter:PythonPlugin:OutputVariable",
    ),
    (
        "Total Active Power:PythonPlugin:OutputVariable [](TimeStep)",
        "Total Active Power:PythonPlugin:OutputVariable",
    ),
    (
        "Total Reactive Power:PythonPlugin:OutputVariable [](TimeStep)",
        "Total Reactive Power:PythonPlugin:OutputVariable",
    ),
    (
        "Total Submeter:PythonPlugin:OutputVariable [](TimeStep)",
        "Total Submeter:PythonPlugin:OutputVariable",
    ),
    ("Electricity:Facility [J](Hourly)", "Electricity:Facility"),
    ("Electricity:Facility [J](TimeStep)", "Electricity:Facility"),
]
