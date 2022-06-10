# Definition

### POAssetInfo

| Symbol          | Code                       | Description                                         |
| --------------- | -------------------------- | --------------------------------------------------- |
| $a$             | `base_asset_symbol`        | Name of base asset                                  |
| $i$             | N/A                        | Asset slot number of asset a.$i \in {0,1,...,N_a}$  |
| $\ _at_i$       | `acquisition_time_sec_utc` | A creation timestamp of asset a                     |
| $\ _ap_i$       | `buy_price`                | A buy price of asset a                              |
| $\ _aq_i$       | `base_asset_quantity`      | Current qunantity of asset a at timestmap $\ _at_i$ |
| $\ _ac_{iB}$    | `buy_commission_rate`      | Buy commision rate of asset a                       |
| $\ _ax_i$       | `asset_holding_rate`       | Current holding rate of asset a                     |
| $\ _ax_i^\star$ | N/A                        | Optimal holding rate of asset a                     |

### Price

| Symbol        | Code | Description                 |
| ------------- | ---- | --------------------------- |
| $\ _ap_i$     | N/A  | Buy price of asset a        |
| $\ _ap$       | N/A  | Current price of asset a    |
| $\ _a\hat{p}$ | N/A  | Forecasted price of asset a |

### ROI

| Symbol          | Code | Description                          | Formula                                                                                    |
| --------------- | ---- | ------------------------------------ | ------------------------------------------------------------------------------------------ |
| $\ _ac_S$       | N/A  | Sell commission rate of asset a      | N/A                                                                                        |
| $\ _ar_i$       | N/A  | Current ROI of asset a bought at i   | $\ _ar_i=\frac{\ _ap(1-\ _ac_S) - \ _ap_i(1+\ _ac_{iB})}{\ _ap(1+\ _ac_{iB})}$             |
| $\ _a\hat{r}_i$ | N/A  | Forecasted ROI of asset a bough at i | $\ _a\hat{r}_i=\frac{\ _a\hat{p}(1-\ _ac_S) - \ _ap_i(1+\ _ac_{iB})}{\ _ap(1+\ _ac_{iB})}$ |
| $\ _a\hat{r}$   | N/A  | Forecasted ROI of asset a from now   | $\ _a\hat{r}=\frac{\ _a\hat{p}(1-\ _ac_S) - \ _ap(1+\ _ac_{iB})}{\ _ap(1+\ _ac_{iB})}$     |
