# Logging activities of crypto-currency (Deprecated)

## Influxdb:2.0

Follow [here](https://docs.influxdata.com/influxdb/v2.0/get-started/).

### Setup

Set up the TLS certification files by  Let&'s encrypt: Follow https://certbot.eff.org/lets-encrypt/ubuntubionic-webproduct

```bash
sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
sudo certbot certonly --standalone
sudo certbot renew --dry-run
```

Files for certification are created.

- The tls-cert file: /etc/letsencrypt/live/\<domain name\>/fullchain.pem
- Private key: /etc/letsencrypt/live/\<domain name\>/privkey.pem

Fix permission:

```bash
sudo chmod +x /etc/letsencrypt/live
sudo chmod +x /etc/letsencrypt/archive
sudo chmod 644 /etc/letsencrypt/live/<domain name>/fullchain.pem
sudo chmod 644 /etc/letsencrypt/live/<domain name>/privkey.pem
```

Create config files:

```bash
cd collector
cp influxdb_config_template.yml config.yml
```

Edit config.yml as follows:

```yaml
# Example, please refer https://docs.influxdata.com/influxdb/v2.0/reference/config-options/
storage-cache-max-memory-size: 700000000  # A limit of memory usage in byte.
tls-cert: /etc/letsencrypt/live/ee-collector.tk/fullchain.pem
tls-key: /etc/letsencrypt/live/ee-collector.tk/privkey.pem
```

Run influxdb with TLS:

```bash
cd collector
bash ./launch_influxdb.sh
```

Set up influxdb by CLI:

```bash
influx setup
```

## Telegraf

Follow [here](https://docs.influxdata.com/telegraf/v1.17/introduction/installation/).

Then, start the telegraf:

```bash
sudo systemctl start telegraf
```

Start the system monitoring plugin with Telegraf:

```bash
bash collector/launch_system_monitor_telegraf.sh &
```

## Crypt-currency logger

Launch logger:

```bash
poetry shell
cd collector
nohup bash ./launch_collector.sh &
```

With Doppler:

```bash
poetry shell
cd collector
doppler login
doppler setup
doppler run --command 'bash ./launch_collector.sh'
```

### Dump logged data from remote-db

With Doppler:

```bash
doppler run --command 'bash ./collector/dump_all.sh /path/to/dump/'
```

Save klines to dataset manner.

```bash
doppler run --command 'bash ./dump_to_dataset.sh /path/to/save/dir 2021-02-22T15:00:00Z 2021-02-25T10:00:00Z'
```