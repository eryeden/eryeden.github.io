# ROI based portfolio optimization

#### Input

| Symbol            | Code                    | Description                                                                                 |
| ----------------- | ----------------------- | ------------------------------------------------------------------------------------------- |
| $\ _ar_i$         | `current_roi`           | Current ROI of asse a, timeslot i, Buy at $\ _at_i, \ _ap_i$ , sell now,$\ _ap$             |
| $\ _a\hat{r}_i$   | `estimated_roi`         | Estimated ROI of asset a, timeslot i, Buy at $\ _at_i, \ _ap_i$, sell future, $\ _a\hat{p}$ |
| $\ _a\hat{r}$     | `current_estimated_roi` | Current estimated ROI of asset a, Buy now,$\ _ap$, sell future, $\ _a\hat{p}$               |
| $\ _ aCov_r(i,j)$ | NA                      | Covariance element of ROI. $i\in\{\ _ar_i, \ _a\hat{r}_i, \ _a\hat{r}\}, j\in\{...\}$       |
| $\ _ax_i$         | `asset_investment_rate` | Current asset investment rate of asset a, timeslot i                                        |

| Symbol           | Code                          | Description                                |
| ---------------- | ----------------------------- | ------------------------------------------ |
| $\ _ap_i$        | `buy_price`                   | Buy price of asset a, timeslot i           |
| $\ _ap_i$        | `current_price`               | Current price of asset a                   |
| $\ _a\hat{p}$    | `estimated_price`             | Estimated price of asset a                 |
| $\ _aCov_p(i,j)$ | NA                            | Covariance element of price.               |
| $\ _ac_{iB}$     | `buy_commission_rate`         | Buy commission rate of asset a, timeslot i |
| $\ _ac_{B}$      | `current_buy_commission_rate` | Current buy commission rate of asset a     |
| $\ _ac_{S}$      | `sell_commission_rate`        | Current sell commission rate of asset a    |

$$
\ _ar_i = 
\frac{\ _ap(1-\ _ac_S) - \ _ap_i(1+\ _ac_{iB})}
{\ _ap(1+\ _ac_{B})}
$$

$$
\ _a\hat{r}_i 
 = 
\frac{\ _a\hat{p}(1-\ _ac_S) - \ _ap_i(1+\ _ac_{iB})}
{\ _ap(1+\ _ac_{B})}
$$

$$
\ _a\hat{r} 
 = 
\frac{\ _a\hat{p}(1-\ _ac_S) - \ _ap(1+\ _ac_{B})}
{\ _ap(1+\ _ac_{B})}
$$

#### Covariance  formula

自己相関の計算をする。以下が成り立つとする。

$$
\ _a\sigma^2_{p}=\ _ aCov_p(\ _a\hat{p}, \ _a\hat{p})
$$

$$
\ _a\sigma^2_{r,i}=\ _ aCov_r(\ _a\hat{r}_i, \ _a\hat{r}_i)
$$

$$
\ _a\sigma^2_{r}=\ _ aCov_r(\ _a\hat{r}, \ _a\hat{r})
$$

すると、分散×定数の公式から以下が成り立つ。どっちも同じ式になる。

$$
\ _a\sigma^2_{r,i}=\left(\frac{1-\ _ac_S}{\ _ap(1+\ _ac_B)}\right)^2
\ _a\sigma^2_{p}
$$

$$
\ _a\sigma^2_{r}=\left(\frac{1-\ _ac_S}{\ _ap(1+\ _ac_B)}\right)^2
\ _a\sigma^2_{p}
$$

Phase1としては、これで良い？おそらくIntra assetの共分散と、inter assetの共分散は異なってくる。

##### Intra asset covariance

以下が成り立つとする。

$$
\ _a\sigma^2_{r,i,j}=\ _ aCov_r(\ _a\hat{r}_i, \ _a\hat{r}_j)
$$

$$
\ _a\sigma^2_{r,0,i}=\ _ aCov_r(\ _a\hat{r}, \ _a\hat{r}_i)
$$

共分散の計算:

$$
Cov(X, Y) = E(XY) - E(X)E(Y)
$$

$$
\ _a\hat{r}_i \ _a\hat{r}_i
=
    \frac{(1-\ _ac_S)^2}{\ _ap^2(1+\ _ac_B)^2}\ _a\hat{p}^2\\
- \frac{(1-\ _ac_S)(\ _ap_i(1+\ _ac_{iB})+\ _ap_j(1+\ _ac_{jB}))}{\ _ap^2(1+\ _ac_B)}\ _a\hat{p}\\
-\frac{\ _ap_i\ _ap_j(1+\ _ac_{iB})(1+\ _ac_{jB})}{\ _ap^2(1+\ _ac_B)^2}


$$

であり、$E(X^2)=E(X)^2+V(X)$なので、

$$
\ _a\sigma^2_{r,i,j}=\ _a\sigma^2_{r,0,i}\\
=\frac{(1-\ _ac_S)^2}{\ _ap^2(1+\ _ac_B)^2}\ _a\sigma_p^2
$$

になる。

##### Inter asset covariance $Cov(\ _a\hat{r}_i, \ _b\hat{r}_j)$

$$
\ _{ab}\sigma_r^2 = Cov(\ _a\hat{r}_i, \ _b\hat{r}_j)
$$

を計算する。

$$
Cov(\ _a\hat{r}_i, \ _b\hat{r}_j) 
= E(\ _a\hat{r}_i \ _b\hat{r}_j)-E(\ _a\hat{r}_i) E(\ _b\hat{r}_j)\\
=\frac{(1-\ _ac_S)(1-\ _bc_S)}{\ _ap\ _bp(1+\ _ac_B)(1+\ _bC_B)}
(E(\ _a\hat{p} \ _b\hat{p}) - E(\ _a\hat{p})E(\ _b\hat{p}))
$$

であり、

$$
Cov(\ _a\hat{p}, \ _b\hat{p}) = \ _{ab}\sigma_p^2
$$

とすれば、$Cov(X,Y)=E(XY)-E(X)E(Y)$なので

$$
Cov(\ _a\hat{p}, \ _b\hat{p}) 
= \ _{ab}\sigma_p^2 = E(\ _a\hat{p} \ _b\hat{p})-E(\ _a\hat{p})E(\ _b\hat{p})
$$

したがって、

$$
Cov(\ _a\hat{r}_i, \ _b\hat{r}_j)=
\frac{(1-\ _ac_S)(1-\ _bc_S)}{\ _ap\ _bp(1+\ _ac_B)(1+\ _bC_B)}\ _{ab}\sigma_p^2
$$

Note: $i,j$には依存しない値となる。$\ _{ab}\sigma_p^2$は事前に相関など価格時系列から計算しておく。
