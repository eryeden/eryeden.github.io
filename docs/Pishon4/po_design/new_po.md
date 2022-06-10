# New PO

## Concept

新POはリバランス時の手数料も考慮に入れる。方法は以下の通り：

1. 各アセットにはタイムスロットという概念がある。あるアセットを購入するとタイムスロットに入る。タイムスロットは購入時刻、価格、取得したアセットの量などの情報を保持する。

2. PO処理は、アセットのタイムスロットごとのリバランスである。タイムスロットごとに保持するアセットの売却量と新規購入量を決め、オーダーを発行する。アセットを新規購入すると１で説明したとおり、新しいタイムスロットができる。

ポイント：　

- Rebalance時のTransaction costを考慮する

- ROIは利用せず、Quote assetの量で利益を評価する

- ROIを利用しない理由は、評価タイミングが存在するとROIの分母がわかりにくくなるため

## Definition

POAssetInfo

| Symbol          | Code                              | Description                                             |
| --------------- | --------------------------------- | ------------------------------------------------------- |
| a               | `base_asset_symbol`               | Name of base asset, $a\in A$                            |
| i               | N/A                               | Asset slot number of asset a$i\in N_a$                  |
| $\ _at_i$       | `acquisition_time_sec_utc`        | A creation timestamp of asset a                         |
| $\ _ap_i$       | `buy_price`                       | Asset Aをタイムスロットiで購入したときの価格                              |
| $\ _ap$         | `current_price`                   | Asset Aの現在の価格                                           |
| $\ _a \hat{p}$  | `forecast_price`                  | Asset Aの予想価格                                            |
| $\ _aq_i$       | `base_asset_quantity`             | The qunantity of asset a at timestmap $\ _at_i$         |
| $\ _a q_i'$     | `optimal_base_asset_quantity`     | The optimal qunantity of asset a at timestmap $\ _at_i$ |
| $\ _a q'$       | `new_optimal_base_asset_quantity` | The optimal qunantity of asset a that acquire now       |
| $\ _ac_{B_i}$   | `buy_commission_rate`             | Buy commision rate of asset a                           |
| $\ _ax_i$       | `asset_holding_rate`              | Current holding rate of asset a                         |
| $\ _ax_i^\star$ | N/A                               | Optimal holding rate of asset a                         |
| $P$             | `profit`                          | 利益                                                      |
| $Q_F$           | `quantity_future`                 | 予想評価額                                                   |
| $Q_I$           | `quantity_investment`             | 投資額                                                     |
| $Q_R$           | `quantity_remaining`              | 保有している自由に利用できるQuote assetの量                             |
| $A$             | `base_assets`                     | 対象の全Base assets                                         |
| $N_a$           | `base_assets_time_slots`          | アセット$a$が有するタイムスロットの集合                                   |

## Problem formulation

やりたいこと：利益Pの分散の最小化

以下のシチュエーションで発生する利益を考える:

1. アセット$a\in A$のタイムスロット$i \in N_a$について、$\ _a q_i$保有している。

2. 最適な保有量$\ _a q_i'$がわかったので、保有量を$\ _aq_i \rightarrow \ _aq_i'$にするよう売却する。このとき、必ず$\ _aq_i >= \ _aq_i'$である。理由は、タイムスロットに属す保有量しか考えないので選択肢は保有量のキープか売却しか存在しないたいめ。購入する場合はタイムスロットを増やす。

3. このとき、売却益を得られるが、手数料などのトランザクションコストが発生する。

4. また、アセット$a$の最適購入量$\ _a q'>=0$がわかったので、購入し新たなタイムスロットを作成する。

5. このとき、購入費に加えて手数料などのトランザクションコストが発生する。

この状態で投資額$Q_I$と、未来の予想評価額$Q_F$を計算する。

したがって、利益$P$:

$$
P=Q_F-Q_I
$$

**投資額$Q_I$について**

投資額は以下の和：

- 全アセットのタイムスロット分の購入時に支払ったQuote assetの量と手数料

- 全アセットの新規購入時に支払ったQuote assetの量と手数料

式にすると:

$$
Q_I=\sum_{a \in A} \sum_{i \in N_a}
\left(
\ _aq_i \ _a p_i(1 + \ _a c_{B_i})
\right)
+ \sum_{a \in A} \left( \ _aq' \ _ap(1+ \ _ac_B) \right)
$$

**予想評価額$Q_F$について**

予想評価額は以下の和：

- 全アセットの各タイムスロットで最適な保有量を持っているとしての、予想評価額から売却したときの手数料を引いたもの

- 全アセットの保有量を最適保有量とする際に売却して得たQuote assetの量から手数料を引いたもの

- 全アセットで新たに追加するタイムスロットの予想評価額

式にすると:

$$
Q_F=\sum_{a \in A} \sum_{i \in N_a} \left(
\ _a q_i' \ _a\hat{p} (1-\ _ac_S) + (\ _aq_i - \ _aq_i')\ _ap (1-\ _ac_S)
\right)
+ \sum_{a \in A} \left(
\ _aq' \ _a\hat{p} (1-\ _ac_S)
 \right)
$$

**各拘束条件について**

- C1; 利益の拘束条件、最小利益$P_E$以上とする:

$$
P=Q_F - Q_I \geq P_E
$$

- C2; 新規購入時の費用と手数料は、売却時に得た手数料を除いたQuote assetの量と自由に使えるQuote assetの量以下:

$$
\sum_{a\in A}\sum_{i\in N_a}
(\ _aq_i - \ _aq_i')\ _ap(1-\ _ac_S) + Q_R 
\geq 
\sum_{a\in A} \ _aq' \ _ap(1+\ _ac_B)
$$

- C3; 各タイムスロットの最適保有量は増えず、売却のみ考える:

$$
\ _a q_i \geq \ _a q_i' \geq 0, a \in A, i \in N_a
$$

- C4; 新規購入量は0以上:

$$
\ _a q' \geq 0, a \in A
$$

- 新規購入費用＋手数料は、手数料を除いた売却額＋現在の保有金額$Q_R$になる:

$$
\sum_{a \in A}\sum_{i \in N_a}(\ _a q_i - \ _a q_i')\ _ap(1-\ _ac_S) + Q_R 
\geq
\sum_{a \in A}\ _aq' \ _ap(1+\ _ac_B)
$$



**分散について**

$P$の分散を最小化する$\ _a q_i'$、$\ _a q'$を見つけるのが目的。したがって$P$の分散$V(P)$を計算する。

$$
V(P) = E[(P-E[P])^2]
$$

このとき、確率変数は$\ _a\hat{p}$のみ。したがって:

$$
P-E(P)=\sum_{a\in A}\sum_{i\in N_a}\left(
\ _a q_i'(1-\ _ac_S)(\ _a\hat{p} - E[\ _a\hat{p}])
\right)
+\sum_{a\in A}\left(
    \ _aq'(1-\ _ac_S)(\ _a\hat{p} - E[\ _a\hat{p}])
\right) \\
= \sum_{a\in A}\left(
\ _a\hat{p} - E[\ _a\hat{p}]
\right)
\left(
\ _aq'(1-\ _ac_S) + \sum_{i \in N_a}\ _aq_i'(1-\ _ac_S)
\right)\\
= \sum_{a\in A}\left(
\ _a\hat{p} - E[\ _a\hat{p}]
\right)
x_a
$$

ここでは、

$$
x_a =
\ _aq'(1-\ _ac_S) + \sum_{i \in N_a}\ _aq_i'(1-\ _ac_S)
$$

としている。

すると、$V(P)$は:

$$
V(P)=\sum_{a \in A}\sum_{b \in B}
(\ _a\hat{p} - E[\ _a\hat{p}])(\ _b\hat{p} - E[\ _b\hat{p}]) x_a x_b\\
= \sum_{a \in A}\sum_{b \in B} Cov(\ _a\hat{p}, \ _b\hat{p})x_a x_b\\
= \sum_{a \in A}\sum_{b \in B} \sigma_{ab} x_a x_b
$$

となる。

## Solver formulation

次のQP最小化を考える:

$$
\begin{matrix}
\rm{minimize} & \boldsymbol{x}^T Z \boldsymbol{x} + \boldsymbol{y}^T \boldsymbol{x} = V(P) \\
\rm{subject\ to} & \boldsymbol{l} \leq A \boldsymbol{x} \leq \boldsymbol{u}
\end{matrix}
$$

状態変数$\boldsymbol{x}$:

$$
\boldsymbol{x}^T = [
\ _1q_1', ..., \ _1q_{N_1}',\ _1q'
, ..., 
\ _A q_1',..., \ _Aq_{N_A}', \ _Aq'
]
$$

このとき、$\{{1,...,A\}}\in A$、$\{{1,...,N_A\}}\in N_A$

**二次形式**

$V(P)$は、

$$
V(P)=\sum_{a\in A}\sum_{b \in B}
\sigma_{ab}(1-\ _ac_S)(1-\ _bc_S)
\left(\ _aq'+\sum_{i\in N_A}\ _aq_i'\right)
\left(\ _bq'+\sum_{i\in N_B}\ _bq_i'\right)
$$

と書けるので、$Z$は、

$$
Z=
\begin{bmatrix}
Z_{11}, ..., Z_{1A}\\
Z_{12}, ..., Z_{2A}\\
...\\
Z_{A1}, ..., Z_{AA}
\end{bmatrix}
$$

ただし、

$$
Z_{ab}=
\sigma_{ab}(1-\ _ac_S)(1-\ _bc_S)
I_{N_a+1, N_b+1}
$$

$I_{s,t}$は要素が全て1で、s行t列の行列とする。

また、$\boldsymbol{y}=\boldsymbol{0}$とする。

**拘束条件**

$A$を、

$$
A=
\begin{bmatrix}
\boldsymbol{a}_1\\
\boldsymbol{a}_2\\
\boldsymbol{a}_3\\
...
\end{bmatrix}
$$

とおく。

- 拘束条件C1について; $P=Q_F-Q_I \geq P_E$:

この条件は$\boldsymbol{a}_1$として導入する。

$$
P =
\sum_{a\in A}\sum_{i \in N_a} 
\ _aq_i'((\ _a\hat{p}-\ _ap)(1-\ _ac_S))
+ \sum_{a \in A} \ _aq'(\ _a\hat{p}(1- \ _ac_S)-\ _ap(1+\ _ac_{B_i}))\\
+\sum_{a\in A}\sum_{i \in N_a} 
\ _aq_i(\ _ap(1-\ _ac_S)-\ _ap_i(1+\ _ac_{B_i}))
$$

より、

$$
\boldsymbol{a}_1 = 
[
    (\ _1\hat{p}-\ _1p)(1-\ _1c_S),...,(\ _1\hat{p}-\ _1p)(1-\ _1c_S),
\ _1\hat{p}(1- \ _1c_S)-\ _1p(1+\ _1c_{B_i}),\\
...,\\
(\ _A\hat{p}-\ _Ap)(1-\ _Ac_S),...,(\ _A\hat{p}-\ _Ap)(1-\ _Ac_S),
\ _A\hat{p}(1- \ _Ac_S)-\ _Ap(1+\ _Ac_{B_i})
]
$$

また、下限$l_0$、上限$u_0$は、

$$
l_0 = P_E -
\sum_{a \in A} \sum_{i\in N_a}
\ _aq_i(\ _ap(1-\ _ac_S) - \ _ap_i(1+\ _ac_{B_i}))
$$

$$
u_0 = \infty
$$

となる。

- 拘束条件C2について; 


