import 'dart:convert';

class Article {
  final String articleTitle;
  final String articlePic;
  final String userName;
  final String count;
  final String prop1;
  final String prop2;
  final String prop3;
  final String prop4;

  //构造函数
  Article(
      {this.articleTitle,
      this.articlePic,
      this.userName,
      this.count,
      this.prop1,
      this.prop2,
      this.prop3,
      this.prop4});

  //string -> List<Article>
  static List<Article> resolveDataFromJsonString(String json) {
    List<Article> listModel = new List<Article>();
    List list = jsonDecode(json)['list'];
    list.forEach((element) {
      var model = new Article(
        articlePic: element['articlePic'],
        articleTitle: element['articleTitle'],
        userName: element['userName'],
        count: element['count'],
        prop1: element['prop1'],
        prop2: element['prop2'],
        prop3: element['prop3'],
        prop4: element['prop4']
      );
      listModel.add(model);
    });

    return listModel;
  }
}
