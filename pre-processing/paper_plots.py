import logging

# logging.basicConfig(level=logging.DEBUG)

from pathlib import Path
from scenario import Scenario
from building import Building
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
from constants import START_TIME, END_TIME
from matplotlib.lines import Line2D
from matplotlib.patches import Patch

# logging.getLogger("matplotlib.font_manager").setLevel(logging.DEBUG)
import matplotlib.font_manager as fm


def print_font_styles(font_name: str):
    results = [f for f in fm.fontManager.ttflist if font_name.lower() in f.name.lower()]
    for r in results:
        print(r.name, r.weight, r.style, r.fname)


print_font_styles("helvetica")
print_font_styles("source sans 3")
print_font_styles("nimbus sans")
print_font_styles("utopia")

scenarios_dir = Path("scenarios")
outputs_dir = Path("outputs/plots")
outputs_dir.mkdir(parents=True, exist_ok=True)
scenarios: dict[str, Scenario] = {}

RED = "#f16f7b"
GRAY = "#9e9e9e"
BLUE = "#53a0ff"
ORANGE = "#ffa831"

for scenario_dir in scenarios_dir.iterdir():
    if not scenario_dir.is_dir():
        continue
    if not scenario_dir.name in ["baseline", "api-attack"]:
        continue
    scenarios[scenario_dir.name] = Scenario(scenario_dir)

filter_start = pd.Timestamp(START_TIME) + pd.Timedelta(10, unit="m")
filter_end = pd.Timestamp(END_TIME)


def plot_scenario_difference(baseline: Scenario, comparison: Scenario, suptitle=""):
    def plot_range(input_df: pd.DataFrame) -> pd.DataFrame:

        if pd.isna(filter_start) or pd.isna(filter_end):
            raise Exception("Not a timestamp")

        if not isinstance(input_df.index, pd.DatetimeIndex):
            input_df.index = pd.to_datetime(
                input_df.index, unit="s", origin=pd.Timestamp(START_TIME)
            )

        return input_df
        # return input_df[
        #     (input_df.index >= filter_start) & (input_df.index <= filter_end)
        # ]

    plt.rcParams.update(
        {
            "font.family": ["Nimbus Sans", "Big Caslon"],
            "axes.titlesize": 16,
            "axes.titleweight": 700,
            "axes.labelsize": 12,
            "axes.labelweight": 700,
            "xtick.labelsize": 10,
            "ytick.labelsize": 10,
            "lines.linewidth": 2.0,
        }
    )
    fig, (ax1, ax2, ax3) = plt.subplots(nrows=3, figsize=(10, 10), sharex=False)
    fig.suptitle(suptitle, fontsize=20, fontweight=700)

    is_dns = "Bad DNS" in comparison.traffic.columns
    print(comparison.traffic.index)
    comparison.traffic.index = comparison.traffic.index + pd.Timedelta(2, unit="m")

    ax2.set_title(
        "Aggregate Battery Power Consumption vs Baseline",
        loc="right",
        pad=10,
    )
    ax3.set_title("Bus Voltages vs Baseline", loc="right", pad=10)
    ax1.set_title("Network Traffic", loc="right", pad=10)
    batteries_data = plot_range(
        comparison.battery_active_power - baseline.battery_active_power
    )
    batteries_data.plot(ax=ax2, legend=False, color=BLUE, drawstyle="steps-post")
    print(batteries_data)
    ax2.set_ylabel("Delta Power (kW)")

    bus_voltage = {}
    for bus_key, bus in baseline.data["bus"].items():
        bus_voltage[bus_key] = (
            comparison.data["bus"][bus_key]["voltage"] - bus["voltage"]
        )

    bus_voltage_data: pd.DataFrame = plot_range(pd.DataFrame(bus_voltage))
    bus_voltage_data.index = bus_voltage_data.index - pd.Timedelta(1, unit="m")

    excursion = bus_voltage_data.abs().max()

    # top 10 by excursion
    top10 = excursion.nlargest(10).index
    others = excursion.index.difference(top10)

    top10_data = bus_voltage_data[top10]
    others_data = bus_voltage_data[others]

    others_data.plot(
        ax=ax3,
        legend=False,
        color=GRAY,
        drawstyle="steps-post",
        linewidth=1.0,
        label="Top 10 Excursions",
    )
    top10_data.plot(
        ax=ax3,
        legend=False,
        color=ORANGE,
        drawstyle="steps-post",
        label="Other Buses",
    )

    legend_elements = [
        Line2D(
            [0],
            [0],
            color=ORANGE,
            linewidth=2,
            label="Top 10 buses with the\ngreatest voltage deviations",
        ),
        Line2D([0], [0], color=GRAY, linewidth=1, label="Other Buses"),
    ]

    ax3.legend(handles=legend_elements, loc="upper left")

    ax3.set_ylabel("Delta Voltage (p.u.)")
    ax3.set_label("Voltage")
    ax3.set_xlabel("Time")

    low, high = ax3.get_ylim()
    bound = max(abs(low), abs(high))
    ax3.set_ylim(-bound, bound)

    traffic = plot_range(comparison.traffic)
    if is_dns:
        traffic.plot(ax=ax1, color=[GRAY, RED, "green"])
        ax1.set_yscale("log")
    else:
        traffic.iloc[:, 0].plot(ax=ax1, color=GRAY, kind="area")
        traffic.iloc[:, 1].plot(ax=ax1, color=RED, kind="area")
        legend_elements = [
            Patch(facecolor=GRAY, label="Normal Traffic"),
            Patch(facecolor=RED, label="Attack Traffic"),
        ]
        ax1.legend(handles=legend_elements, loc="upper left")
    ax1.set_ylabel("Bandwidth (kb/s)")

    callout_time = pd.Timestamp(START_TIME) + pd.Timedelta(74.5, "m")

    for ax in (ax1, ax2, ax3):
        ax.axvline(callout_time, color=GRAY, linestyle=":", linewidth=3)
        ax.set_xlim(filter_start, filter_end)
        print(ax.get_xlim())
        ax.spines["top"].set_visible(False)
        ax.spines["right"].set_visible(False)
        ax.spines["bottom"].set_color("#000")
        ax.spines["left"].set_color("#000")
        ax.set_facecolor("#f8f8f8")
    ax1.tick_params(axis="x", which="both", labelbottom=False)
    ax1.set_xlabel("")
    ax2.tick_params(axis="x", which="both", labelbottom=False)
    ax2.set_xlabel("")
    ax2.text(
        callout_time,
        ax2.get_ylim()[1] - 10,
        "Start of Attack",
        rotation=90,
        va="top",
        ha="right",
        fontsize=12,
        color="#000",
    )

    fig.savefig(outputs_dir / f"{suptitle}.pdf", dpi=300, format="pdf")


plot_scenario_difference(
    scenarios["baseline"], scenarios["api-attack"], "API Attack Scenario"
)
# plot_scenario_difference(
#     scenarios["baseline"], scenarios["api-mitigation"], "API Mitigation Scenario"
# )
# plot_scenario_difference(
#     scenarios["baseline"], scenarios["dns-attack"], "DNS Attack Scenario"
# )
# plot_scenario_difference(
#     scenarios["baseline"], scenarios["dns-mitigation"], "DNS Mitigation Scenario"
# )
