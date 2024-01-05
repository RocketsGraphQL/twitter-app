curl -d '
    {
        "type": "create_cron_trigger",
        "args": {
            "name": "eod_reports_2",
            "webhook": "https://mywebhook.com/eod",
            "schedule": "0 22 * * 1-5",
            "include_in_metadata": true,
            "payload": {
                "x": "y"
            },
            "retry_conf": {
                    "num_retries": 3,
                    "timeout_seconds": 120,
                    "tolerance_seconds": 21675,
                    "retry_interval_seconds": 12
            },
            "comment": "sample_cron comment"
        }
    }
' -H "Content-Type: application/json" \
  -H "X-Hasura-Role: admin" \
  -H "X-hasura-admin-secret: a117bb97" \
  -X POST https://hasura-vlklxvo.rocketgraph.app/v1/metadata