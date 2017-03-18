import csv
import json
import numpy as np
import pandas as pd
from pprint import pprint

def get_nodes_data():
 
# Load Data (Nodes)
    xls = pd.ExcelFile('data.xlsx')
    nodes = xls.parse('nodecount', na_values=['NA'] )
    nodes  = nodes[[1]]
    nodes = np.array(nodes).tolist()

    pods = {}
    x = 10
    y = 0

    for node in nodes:
        pod = node[0][:7]
        if pod not in pods:
            x = 10
            y = y + 10
            pods[pod] = [[node[0], x, y]]
        else:
            pods[pod].append([node[0], x, y])
        x = x + 10
    return pods
