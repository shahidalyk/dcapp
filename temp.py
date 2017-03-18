import csv
import json
import numpy as np
import pandas as pd
from pprint import pprint

def get_temp_data():
 
    # Load Data (Temp rows)
    xls = pd.ExcelFile('data.xlsx')
    rows = xls.parse('temp', na_values=['NA'] )
    return rows.reset_index().to_json(orient='records')
