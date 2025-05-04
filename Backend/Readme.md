# Manual start
/opt/homebrew/opt/kafka/libexec/bin/zookeeper-server-start.sh /opt/homebrew/etc/kafka/zookeeper.properties

# In another terminal, start Kafka
/opt/homebrew/opt/kafka/libexec/bin/kafka-server-start.sh /opt/homebrew/etc/kafka/server.properties
