import dpkt
import pathlib
import ipaddress
import pandas as pd
import matplotlib.pyplot as plt

pcap_path = pathlib.Path("scenarios/api-mitigation/mirrordata.pcap")
pcap = dpkt.pcap.Reader(pcap_path.open("rb"))

requests: dict[ipaddress.IPv4Address, dict[ipaddress.IPv4Address, list[float]]] = {}


batteries_subnet = ipaddress.IPv4Network("40.0.0.0/8")
for timestamp, buf in pcap:
    eth = dpkt.ethernet.Ethernet(buf)
    ip = eth.data

    if isinstance(ip, dpkt.ip.IP):
        dst = ipaddress.IPv4Address(ip.dst)
        if dst not in batteries_subnet:
            continue
        tcp = ip.data
        # try:
        #     request = dpkt.http.Request(tcp.data)
        # except (dpkt.dpkt.NeedData, dpkt.dpkt.UnpackError):
        #     continue

        src = ipaddress.IPv4Address(ip.src)
        if dst not in requests:
            requests[dst] = {}
        if src not in requests[dst]:
            requests[dst][src] = []
        requests[dst][src].append(timestamp)

dataframes: dict[str, pd.DataFrame] = {}
for dst, srcs in requests.items():
    serieses: dict[str, pd.Series] = {}
    for src, timestamps in srcs.items():
        series = pd.Series(
            data=[1] * len(timestamps), index=pd.to_datetime(timestamps, unit="s")
        )
        serieses[str(src)] = series.resample("1min").sum().fillna(0)
    dataframe = pd.DataFrame(serieses).resample("1min").sum().fillna(0)
    print(f"{dst}\n{dataframe}")
    dataframes[str(dst)] = dataframe
    fig, ax = plt.subplots(figsize=(10, 6))
    dataframe.plot.area(ax=ax, title=f"API Requests to {dst} Over Time")
    dataframe.to_csv(f"{dst}.csv")
    fig.savefig(f"{dst}.png")
