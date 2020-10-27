import 'package:flutter/material.dart';
import 'package:flutter_demo/BalanceScreen.dart';
import 'package:flutter_demo/ContanctsScreen.dart';
import 'package:flutter_demo/MusicScreen.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  //RN  render
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: FirstScreen(),
      // initialRoute: '/second',
      // routes: <String, WidgetBuilder> {
      //   '/first': (BuildContext context) => new FirstScreen(),
      //   '/second': (BuildContext context) => new SecondScreen(content: '内容',title: '标题')
      // },
    );
  }
}

// class FirstScreen extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: AppBar(
        title: new Text('管理'),
        // centerTitle: false,
        // leading: Icon(Icons.access_alarms),
        // actions: <Widget>[
        //   Icon(Icons.accessibility),
        // ],
      ),
      body: new Center(
         child: Text('管理'),
      ),
    );
  }
}

// class SecondScreen extends StatelessWidget {

//   final String content;
//   final String title;

//   //构造函数
//   SecondScreen({this.content, this.title});

//   @override
//   Widget build(BuildContext context) {
//     return new Scaffold(
//       appBar: AppBar(
//         title: new Text('$title'),
//       ),
//       body: new Center(
//          child: Text('$content'),
//       ),
//     );
//   }

// }

class FirstScreen extends StatefulWidget {
  FirstScreen({Key key}) : super(key: key);

  @override
  _FirstScreenState createState() => _FirstScreenState();
}

class _FirstScreenState extends State<FirstScreen> {
  List < BottomNavigationBarItem > _list;
  List < Widget > _pageList;
  int selectIndex = 0;

  @override
  void initState() {
    super.initState();

    initData();
  }
  // 暗号：初见Flutter
  initData() {
    _list = [
      BottomNavigationBarItem(
        icon: Image.asset(
          'assets/images/invite_normal.png',
          width: 24, height: 24
        ),
        title: new Text('好友'),
        activeIcon: Image.asset(
          'assets/images/invite_selected.png',
          width: 24, height: 24
        )
      ),
      BottomNavigationBarItem(
        icon: Image.asset(
          'assets/images/discovery_normal.png',
          width: 24, height: 24
        ),
        title: new Text('发现'),
        activeIcon: Image.asset(
          'assets/images/discovery_selected.png',
          width: 24, height: 24
        )
      ),
      BottomNavigationBarItem(
        icon: Image.asset(
          'assets/images/manager_normal.png',
          width: 24, height: 24
        ),
        title: new Text('管理'),
        activeIcon: Image.asset(
          'assets/images/manager_selected.png',
          width: 24, height: 24
        )
      ),
      BottomNavigationBarItem(
        icon: Image.asset(
          'assets/images/mine_normal.png',
          width: 24, height: 24
        ),
        title: new Text('我的'),
        activeIcon: Image.asset(
          'assets/images/mine_selected.png',
          width: 24, height: 24
        )
      ),
    ];
    _pageList = [
      InvitePage(), // 好友 页import
      DiscoveryPage(), // 发现 页import
      ManagerPage(), // 管理 页import
      MinePage() // 我的 页import
    ];
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: selectIndex,
        children: _pageList,
      ),
      bottomNavigationBar: new BottomNavigationBar(
        items: _list, // items抽离
        type: BottomNavigationBarType.fixed,
        currentIndex: selectIndex,
        selectedFontSize: 14,
        unselectedFontSize: 14,
        selectedItemColor: Color.fromARGB(255, 242, 89, 63),
        onTap: (index) {
          setState(() {
            selectIndex = index;
          });
        }
      },
    };
  }
}


