import csv
import numpy as np
import pandas as pd

# Load Data (Jobs, Nodes and Temperature)
xls = pd.ExcelFile('data.xlsx')
jobs = xls.parse('jobs')
nodes = xls.parse('nodes', na_values=['NA'] )
temp = xls.parse('temp', na_values=['NA'] )
#data.reset_index(drop=True)
jobs = np.array(jobs)
nodes = np.array(nodes)
temp = np.array(temp)

