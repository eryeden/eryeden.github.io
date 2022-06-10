# Order publishing

SimバージョンとRealバージョンをを別に実装している。OrderExecutorの統一は今後の課題。Saifuの更新とClientの失敗時のリカバリー処理が統一できなかった。

#### Input

| Symbol      | Code | Description                            | Formula                                                                 |
| ----------- | ---- | -------------------------------------- | ----------------------------------------------------------------------- |
| POAssetInfo | N/A  | Bought asset info                      | N/A                                                                     |
| $A$         | N/A  | All base asset name                    | N/A                                                                     |
| $N_a$       | N/A  | All time slot id of certain base asset | N/A                                                                     |
| $q_{all}$   | N/A  | Over all investment quantity           | $q_{all}=\sum_a^A{\sum_i^{N_a}{(\ _ap \ _aq_i(1+\ _ac_{iB})})}+\ _{Q}q$ |
| $\ _Qq$     | N/A  | Quote asset quantity                   | N/A                                                                     |

#### 全投資額($q_{all}$)の計算

$q_{all}$: 全投資額。支払った手数料も含む。ただし、通貨の価格は現在価格とする。理由はROIの正規化を現在価格で行っているため。

$$
q_{all}=\sum_{a\in A}{\sum_{i\in N_a}{(\ _ap \ _aq_i(1+\ _ac_{iB})})}+\ _{Q}q
$$

#### 各Assetごとの購入量・売却量($\Delta \ _aq$)の計算

Portfolio optimizationの結果、アセットとそのタイムスロットごとに次が分かる

| Symbol          | Code | Description                                     | Fomula |
| --------------- | ---- | ----------------------------------------------- | ------ |
| $\ _ax_i$       | N/A  | Current holding rate of asset $a$, timeslot $i$ | N/A    |
| $\ _ax_i^\star$ | N/A  | Optimal holding rate of asset $a$, timeslot $i$ | N/A    |
| $\ _ax^\star$   | N/A  | Optimal holding rate of new timeslot            | N/A    |

ここからアセット$a$について購入量$\ _aq_{B}$が決まる。注意: $\ _aq_B$は投資額ではなく取得する必要のあるBaseAssetの量。

タイムスロット$i$において修正が必要なBaseAssetの量$\Delta\ _aq_i$は

$$
\Delta\ _aq_i=\ _aq_i^\star - \ _aq_i 
= \frac{\ _ax_i^\star q_{all}}{\ _ap(1+\ _ac_{iB})}
- \frac{\ _ax_i q_{all}}{\ _ap(1+\ _ac_{iB})}
$$

Note: $\Delta\ _aq_i >0$はBaseAssetの保有量を増やす（買い増し）、$\Delta\ _aq_i<0$は保有量を減らすこと（売却）を意味する。

新規購入となる新しいBaseAssetの量$\Delta\ _aq_{new}$は

$$
\Delta\ _aq_{new}=\frac{\ _ax^\star q_{all}}{\ _ap(1+\ _ac_{iB})}
$$

したがってAsset a全体での保有量の修正量$\Delta\ _aq$は

$$
\Delta\ _aq=\sum_{i\in N_a}(\Delta\ _aq_i)+\Delta\ _aq_{new}
$$

Note: $\Delta\ _aq > 0$の場合はAsset aを購入、$\Delta\ _aq < 0$の場合は売却する。

#### Order処理

Asset $a$ごとに修正量$\Delta \ _aq$をから売却・購入Orderを発行する。

_OrderPubish_

1. $\Delta \ _aq, a\in \{A, \Delta\ _aq < 0\}$である売却分を最初にオーダーする。
   
    もし、売却予定の$\Delta\ _aq_i$ よりもWallet内の残高が少ない場合は、Wallet内の残高を全て売却する。売却に失敗した場合は、POAssetInfoを更新しない。

2. $\Delta \ _aq, a\in \{A, \Delta\ _aq > 0\}$である購入分をオーダーする。$\Delta\ _aq$が大きいものから順にオーダーを発行する。購入する資産がなくなったところでオーダーはストップする。もし、購入予定のBaseAssetの量を賄うQuoteAsset量が足りない場合は、現状保有するQuoteAsset量で購入できる最大のBaseAsset量のOrderを発行する。また、precision fit後に$1e^-7$ 以下の値になった場合は、Order量0としてこれ以上買えないと判断。ここでBuy orderの発行はストップする。購入に失敗した場合はPOAssetInfoを更新しない。
   
   Note: このときROI($\ _a\hat{r}$)が大きなものからOrderを発行することも検討したが、ROIは同一アセットのタイムスロット全てが影響する。
