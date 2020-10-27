import 'package:flutter/material.dart';
import 'package:flutterProject/lesson2/find/Article.dart';

class ArticleItem extends StatelessWidget {
  final Article model;
  ArticleItem(this.model);
  @override
  Widget build(BuildContext context) {
    // 暗号----不用背，学规律-----
    return Container(
      height: 200,
      padding: EdgeInsets.all(5),
      child: Card(
        elevation: 5,
        child: Padding(
          padding: EdgeInsets.all(5),
          child: new Column(
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Container(
                    width: 80,
                    height: 80,
                    decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(10),
                        image: DecorationImage(
                            image: NetworkImage(model.articlePic),
                            fit: BoxFit.cover)),
                  ),
                  Row(
                    children: <Widget>[
                      Container(
                          height: 64,
                          child: Center(child: Text(model.articleTitle))),
                      Padding(
                        padding: EdgeInsets.only(left: 20),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: <Widget>[
                            Text('|' + model.prop1),
                            Text('|' + model.prop2),
                            Text('|' + model.prop3),
                          ],
                        ),
                      ),
                    ],
                  )
                ],
              ),
              Padding(
                  padding: EdgeInsets.only(top: 20),
                  child: Divider(height: 1.0, indent: 60.0, color: Colors.red)),
              Padding(
                padding: EdgeInsets.all(20),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: <Widget>[Text('热招'), Icon(Icons.arrow_right)],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
