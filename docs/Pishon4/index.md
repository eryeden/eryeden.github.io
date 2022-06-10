# Welcome to Pishon4


## Docs
- Installation and setup: This documentation.
- [Bot basics](strategy_runner.md)
- [Data acquisition for backtesting](data_acquisition.md)
- [Parameter tuning](parameter_tuning.md)
- [Portfolio optimization design docs](po_design/index.md)

## Installation
1. Install pyenv. Make sure to follow [this guidance](https://github.com/pyenv/pyenv/wiki/common-build-problems#prerequisites).
2. Install poetry.
3. Install TA-lib dependencies. Follow [here](https://github.com/mrjbq7/ta-lib#linux). 
```bash
sudo apt install build-essential
wget URL:to/ta-lib-0....
cd talib/library
./configure --prefix=/usr LDFLAGS="-lm"  # https://aur.archlinux.org/packages/ta-lib/
make -j$(nproc)
sudo make install
```   

4. Set the python interpreter as 3.7.9 and install dependencies.
```bash
pyenv install 3.7.9
pyenv local 3.7.9
poetry install
```

5. Inject the library path into site-packages.
```bash
bash inject_library_path.sh
```