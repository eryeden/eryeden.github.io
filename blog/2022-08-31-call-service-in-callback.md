---
slug: memo
title: ROS2 Callback内でServiceを呼ぶ
authors: [eryeden]
tags: [memo, python, rclpy]
---

ROS2ではTopicのSubscribe時に呼ばれるCallbackやTimerのCallbackを仕込むことができる。
Callback関数内でROS2のServiceを呼ぶとデッドロックする場合がある。
以下の方法で回避が可能。

ポイントは`MutuallyExclusiveCallbackGroup`。Node内のServiceClientとTimerCallbackを別スレッドで処理することを明示している。
この場合、`MultiThreadedExecutor`でNodeを実行する必要があるので注意。


```python
import rclpy
from rclpy.node import Node
from rclpy.timer import Timer

from rclpy.callback_groups import MutuallyExclusiveCallbackGroup
from rclpy.executors import MultiThreadedExecutor

class TestNode(Node):

    def __init__(self):
        super().__init__('test_node')

        # Service
        self.test_service = self.create_client(srv.Test, 'test_service', callback_group=MutuallyExclusiveCallbackGroup()) # <= ここ

        # timer
        self.t_callback = self.create_timer(1, self.timer_cb, callback_group=MutuallyExclusiveCallbackGroup()) # <= ここ

    # Timer callback
    def timer_cb(self):
        self.get_logger().info("Timer cb")

        # Call service
        test_request = srv.Test.Request()
        test_response: srv.Test.Response = self.test_service.call(test_request)


def main():
    rclpy.init()

    test_node = TestNode()

    executor = MultiThreadedExecutor()  # <= ここ
    executor.add_node(test_node)

    executor.spin()

    test_node.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
```

