class CompanyListProvider with ChangeNotifier {
  
  List<Company> _companyList = new List();
  int _currentPage = 1;
  int _showValue = 0;

  int _type = 2;
  var url = 'http://m.app.haosou.com/index/getData?';
  // 暗号：江湖再见
  //获取list列表数据
  List<Company> get companyList => _companyList;

  //存储列表数据
  set companyList(List<Company> companyList) {
    _companyList = companyList;
    notifyListeners();
  }

  //获取当前页数
  int get currentPage => _currentPage;
  //获取当前显示的内容
  int get showValue => _showValue;

  //refresh action
  refreshData() async{

    var httpURL = url + 'type=$_type&page=1';
    var response = await http.get(httpURL);
    if(response.statusCode == 200) {
      var resultStr = response.body;
      var resultMap = json.decode(resultStr).cast<String, dynamic>();
      _companyList = Company.fromMapData(resultMap);
      _currentPage = 2;
      _showValue = 1;
      
      notifyListeners();
      return true;
    }
    return false;

  }

  // loadMore Action
  loadMoreData() async{
    
    var httpURL = url + 'type=$_type&page=$_currentPage';
    var response = await http.get(httpURL);

    if(response.statusCode == 200) {
      var resultStr = response.body;
      var resultMap = json.decode(resultStr).cast<String, dynamic>();
      _companyList.addAll(Company.fromMapData(resultMap));
      _currentPage ++;

      notifyListeners();
      return true;
    }
    return false;

  }

}



Widget getListWidget() {
    
    CompanyListProvider provider =
        Provider.of<CompanyListProvider>(context, listen: false);

    return SmartRefresher(
      controller: _refreshController,
      enablePullDown: true,
      enablePullUp: true,
      header: ClassicHeader(
        refreshingText: '正在加载中...', 
        idleText: '下拉刷新',
        completeText:'加载完成',
        failedText: '数据刷新异常',
        releaseText:'松开刷新'),
      footer: ClassicFooter(
        idleText:'加载更多数据',
        loadingText:'玩命加载中...',
        noDataText:'没有更多数据'
      ),
      onRefresh: _onRefresh,
      onLoading: _onLoading,
      child: new ListView.builder(
        itemCount: provider.companyList.length,
        itemBuilder: (context, index) {
          return CompanyListItem(provider.companyList[index]);
        }, 
      ),
    );
  }

  void _onRefresh() async{
    
    CompanyListProvider provider =
        Provider.of<CompanyListProvider>(context, listen: false);

    bool isSuccess = await provider.refreshData();

    if(isSuccess) {
      _refreshController.refreshCompleted();
    }else {
      _refreshController.refreshFailed();
    }
    
  }

  void _onLoading() async{
    
    CompanyListProvider provider =
        Provider.of<CompanyListProvider>(context, listen: false);
    bool isSuccess = await provider.loadMoreData();
    if(isSuccess) {
      _refreshController.loadComplete();
    }else {
      _refreshController.loadFailed();
    }
    
  }