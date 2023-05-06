import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';
// Import for Android features.
// import 'package:webview_flutter_android/webview_flutter_android.dart';
// // Import for iOS features.
// import 'package:webview_flutter_wkwebview/webview_flutter_wkwebview.dart';

// late List<CameraDescription> _cameras;

void main() async {
  // WidgetsFlutterBinding.ensureInitialized();
  // _cameras = await availableCameras();
  
  // runApp(CameraApp());
  
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  MyApp({super.key});
  
  WebViewController controller = WebViewController()
  ..setJavaScriptMode(JavaScriptMode.unrestricted)
  ..setBackgroundColor(const Color(0x00000000))
  // ..setNavigationDelegate(
  //   NavigationDelegate(
  //     onProgress: (int progress) {
  //       // Update loading bar.
  //     },
  //     onPageStarted: (String url) {},
  //     onPageFinished: (String url) {},
  //     onWebResourceError: (WebResourceError error) {},
  //     onNavigationRequest: (NavigationRequest request) {
  //       if (request.url.startsWith('https://www.youtube.com/')) {
  //         return NavigationDecision.prevent;
  //       }
  //       return NavigationDecision.navigate;
  //     },
  //   ),
  // )
  // ..loadRequest(Uri.parse('https://flutter.dev'));
  ..loadRequest(Uri.parse('https://questsense-f9422.web.app'));

  

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context)  {
    // return Scaffold(
    //   appBar: AppBar(title: const Text('Flutter Simple Example')),
    //   body: WebViewWidget(controller: controller),
    // );
    
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        // This is the theme of your application.
        //
        // Try running your application with "flutter run". You'll see the
        // application has a blue toolbar. Then, without quitting the app, try
        // changing the primarySwatch below to Colors.green and then invoke
        // "hot reload" (press "r" in the console where you ran "flutter run",
        // or simply save your changes to "hot reload" in a Flutter IDE).
        // Notice that the counter didn't reset back to zero; the application
        // is not restarted.
        primarySwatch: Colors.blue,
      ),
      // home: const MyHomePage(title: 'Flutter Demo Home Page'),

      debugShowCheckedModeBanner: false,
      home: WebViewWidget(controller: controller),
      // home: new Splash(),
      // home: new Testlive(),

    );
  }

}
