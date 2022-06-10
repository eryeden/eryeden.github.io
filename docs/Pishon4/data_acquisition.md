# Data acquisition for backtesting

### Download kline/orders and create kline/feature dataset

```bash
cd <Pishon4 root>/collector
doppler run -- python ./dump_assessments.py --start 2021-05-28T00:00:00+09:00 --end 2021-05-30T00:00:00+09:00 --base BTC ETH DOGE EOS XRP ETC ADA MATIC LTC BCH DOT NANO --quote USDT --ta_config ../example/Pishon4/sample_talib_config.yaml --output test_output
```

### Create kline dataset form the row json kline data

```bash
cd <Pishon4 root>/collector
python dataset_cli.py kline ../local_assets/binance_klines/2021_05_26JST_2021_05_30JST/kline_raw/ ../local_assets/binance_klines/2021_05_26JST_2021_05_30JST/kline/ USDT
```

### Create feature dataset from the kline dataset

```bash
cd <Pishon4 root>/collector
python dataset_cli.py feature ../local_assets/binance_klines/2021_05_26JST_2021_05_30JST/kline ../local_assets/binance_klines/2021_05_26JST_2021_05_30JST/feature_macd sample_talib_config_macd.yaml USDT
```
