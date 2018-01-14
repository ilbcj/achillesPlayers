<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>page.html</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <!-- Bootstrap 3.3.6 -->
  <link rel="stylesheet" href="<%=path %>/css/vender/bootstrap/bootstrap.min.css">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="<%=path %>/css/vender/font-awesome/font-awesome.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="<%=path %>/css/vender/ionicons/ionicons.min.css">
  
  <link rel="stylesheet" href="<%=path %>/css/AdminLTE.min.css">
  <!-- AdminLTE Skins. We have chosen the skin-blue for this starter
        page. However, you can choose any other skin. Make sure you
        apply the skin class to the body tag so the changes take effect.
  -->
  <link rel="stylesheet" href="<%=path %>/css/skins/skin-blue.min.css">

  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="<%=path %>/js/vender/html5shiv.min.js"></script>
  <script src="<%=path %>/js/vender/respond.min.js"></script>
  <![endif]-->
</head>

<body>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
  <div class="content-wrapper-inner">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
		选手注册
      </h1>
      <ol class="breadcrumb">
        <li><a href="javascript:void(0)"><i class="fa fa-home"></i> 首页</a></li>
        <li class="active">选手信息管理</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">

      <div class="box box-info">
            <div class="box-header with-border">
              <h3 class="box-title">报名信息</h3>
            </div>
            <!-- /.box-header -->
            <!-- form start -->
            <form class="form-horizontal" action="<%=path %>/login/reg" method="post">
              <div class="box-body">
              	<div class="alert alert-info alert-dismissible hidden" style="padding-right: 15px;">
						       <i class="icon fa fa-warning"></i> 
						       Info alert preview. This alert is dismissable.
						    </div>
                <div class="form-group">
                  <label for="name" class="col-sm-2 control-label">选手姓名</label>

                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="playername" name="playername" placeholder="选手姓名">
                  </div>
                </div>
                <div class="form-group">
                  <label for="loginid" class="col-sm-2 control-label">选手ID</label>

                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="loginid" name="loginid" placeholder="选手ID">
                  </div>
                </div>
                <div class="form-group">
                  <label for="qq" class="col-sm-2 control-label">选手qq</label>

                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="qq" name="qq" placeholder="选手ID">
                  </div>
                </div>
              </div>
              <!-- /.box-body -->
              <div class="box-footer">
              <div class="row">
              	<div class="col-xs-3 col-xs-offset-3 text-center">
                	<button type="submit" class="btn btn-info btn-lg">绑定</button>
                </div>
              	<div class="col-xs-3 text-center">
                	<button type="reset" class="btn btn-default btn-lg">取消</button>
                </div>
                </div>
              </div>
              <!-- /.box-footer -->
            </form>
          </div>

    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper-inner -->
  </div>
  <!-- /.content-wrapper -->	

<!-- jQuery 2.2.3 -->
<script src="<%=path %>/plugins/jQuery/jquery-2.2.3.min.js"></script>
<!-- Bootstrap 3.3.6 -->
<script src="<%=path %>/js/vender/bootstrap/bootstrap.min.js"></script>
<!-- AdminLTE App -->
<script src="<%=path %>/js/app.js"></script>

<!-- Optionally, you can add Slimscroll and FastClick plugins.
     Both of these plugins are recommended to enhance the
     user experience. Slimscroll is required when using the
     fixed layout. -->
<!-- TDMS -->
<script>
var message = '<s:property value="message" />';
  $(function () {
    if( message != '' ) {
			$("div.alert").removeClass('hidden').html('<i class="icon fa fa-warning"/>' + message);
		} 
  });
</script>
</body>
</html>
				


