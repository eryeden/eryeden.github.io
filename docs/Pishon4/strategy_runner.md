# Bot basics

### Simple example for backtesting

```bash
poetry shell
python example/Pishon4/strategy_study/simple_backtest.py
```

### Simple example for real-time trading

```bash
poetry shell
doppler run -- python example/Pishon4/strategy_study/simple_realtime.py -l log/
```

Before running the real-time trading example, the following steps should be done:

1. Doppler setup
2. Environment variables setup

Please follow the instructions [here](../README.md).