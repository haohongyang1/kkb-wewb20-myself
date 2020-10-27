import 'package:flutter/material.dart';
import 'package:flutterProject/lesson2/find/Article.dart';
import 'package:flutterProject/lesson2/find/ArticleItem.dart';

class FindScreen extends StatefulWidget {
  FindScreen({Key key}) : super(key: key);

  @override
  _FindScreenState createState() => _FindScreenState();
}

class _FindScreenState extends State<FindScreen> {
  List<Article> _dataList = [];

  @override
  void initState() {
    super.initState();

    getDataList();
  }

  getDataList() {
    setState(() {
      _dataList = Article.resolveDataFromJsonString("""
      {
            "list": [
               {
                "articleId": "1001",
                "articleTitle": "上海市浦东新区",
                "articlePic": "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1766066825,2906599954&fm=26&gp=0.jpg",
                "prop1": "互联网",
                "prop2": "B轮",
                "prop3": "10000人以上",
                "prop4": "资深产品工程师",
                "userName": "花痴党",
                "count": "500"
              }
            ]
          }
    """);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: new Text('管理'),
        ),
        body: ListView.builder(
            itemCount: _dataList.length,
            itemBuilder: (context, index) {
              var model = _dataList[index];
              return ArticleItem(model);
            }));
  }
}
