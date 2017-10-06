<?php
  // Set date timezone.
  date_default_timezone_set('Europe/Bucharest');

  // important variables that will be used throughout this example
  $bucket = 'froala-dev';
  $region = 's3';
  $keyStart = 'editor/';
  $acl = 'public-read';

  // these can be found on your Account page, under Security Credentials > Access Keys
  $accessKeyId = $_SERVER['AWS_ACCESS_KEY'];
  $secret = $_SERVER['AWS_SECRET_ACCESS_KEY'];

  $policy = base64_encode(json_encode(array(
      // ISO 8601 - date('c'); generates uncompatible date, so better do it manually
      'expiration' => date('Y-m-d\TH:i:s.000\Z', strtotime('+1 day')),
      'conditions' => array(
          array('bucket' => $bucket),
          array('acl' => $acl),
          array('success_action_status' => '201'),
          array('x-requested-with' => 'xhr'),
          array('starts-with', '$key', $keyStart),
          array('starts-with', '$Content-Type', '') // accept all files
      )
  )));

  $signature = base64_encode(hash_hmac('sha1', $policy, $secret, true));
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="/assets/third/froala_editor_2.7.0/css/froala_editor_5ec3592.css">
  <link rel="stylesheet" href="/assets/third/froala_editor_2.7.0/css/froala_style_041c7bd.css">
  <link rel="stylesheet" href="/assets/third/froala_editor_2.7.0/css/plugins/code_view_3ac316d.css">
  <link rel="stylesheet" href="/assets/third/froala_editor_2.7.0/css/plugins/colors_542efcd.css">
  <link rel="stylesheet" href="/assets/third/froala_editor_2.7.0/css/plugins/emoticons_0ccf474.css">
  <link rel="stylesheet" href="/assets/third/froala_editor_2.7.0/css/plugins/image_manager_0283da4.css">
  <link rel="stylesheet" href="/assets/third/froala_editor_2.7.0/css/plugins/image_2b1cdfa.css">
  <link rel="stylesheet" href="/assets/third/froala_editor_2.7.0/css/plugins/line_breaker_24b72f3.css">
  <link rel="stylesheet" href="/assets/third/froala_editor_2.7.0/css/plugins/table_3544d23.css">
  <link rel="stylesheet" href="/assets/third/froala_editor_2.7.0/css/plugins/char_counter_dcd1c06.css">
  <link rel="stylesheet" href="/assets/third/froala_editor_2.7.0/css/plugins/video_8947d68.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.3.0/codemirror.min.css">

  <style>
      body {
          text-align: center;
      }

      div#editor {
          width: 81%;
          margin: auto;
          text-align: left;
      }
  </style>
</head>

<body>
  <div id="editor">
      <div id='edit' style="margin-top: 30px;">
        <h1>Click and edit</h1>

        <img class="fr-fir fr-dii" src="/assets/third/froala_editor_2.7.0/img/photo1.jpg" alt="Old Clock" width="300"/>Lorem <strong>ipsum</strong> dolor sit amet, consectetur <strong>adipiscing <em>elit.</em> Donec</strong> facilisis diam in odio iaculis blandit. Nunc eu mauris sit amet purus <strong>viverra</strong><em> gravida</em> ut a dui.<br/>
        <ul><li>Vivamus nec rutrum augue, pharetra faucibus purus. Maecenas non orci sagittis, vehicula lorem et, dignissim nunc.</li> <li>Suspendisse suscipit, diam non varius facilisis, enim libero tincidunt magna, sit amet iaculis eros libero sit amet eros. Vestibulum a rhoncus felis.<ol><li>Nam lacus nulla, consequat ac lacus sit amet, accumsan pellentesque risus. Aenean viverra mi at urna mattis fermentum.</li> <li>Curabitur porta metus in tortor elementum, in semper nulla ullamcorper. Vestibulum mattis tempor tortor quis gravida. In rhoncus risus nibh. Nullam condimentum dapibus massa vel fringilla. Sed hendrerit sed est quis facilisis. Ut sit amet nibh sem. Pellentesque imperdiet mollis libero.</li></ol></li></ul>

        <table style="width: 100%;">
          <tr><td>asdasd</td><td>asdasdasd</td></tr>
        </table>

        Sed dictum dictum tristique. Proin eros turpis, ultricies eu sapien eget, ornare rutrum ipsum. Pellentesque eros nisl, ornare nec ipsum sed, aliquet sollicitudin erat. Nulla tincidunt porta <strong>vehicula.</strong><br/>

        <a href="http://google.com" title="Aenean sed hendrerit">Aenean sed hendrerit</a> velit. Nullam eu mi dolor. Maecenas et erat risus. Nulla ac auctor diam, non aliquet ante. Fusce ullamcorper, ipsum id tempor lacinia, sem tellus malesuada libero, quis ornare sem massa in orci. Sed dictum dictum tristique. Proin eros turpis, ultricies eu sapien eget, ornare rutrum ipsum. Pellentesque eros nisl, ornare nec ipsum sed, aliquet sollicitudin erat. Nulla tincidunt porta <strong>vehicula.</strong><br/>

        <i>Nullam laoreet</i> imperdiet orci ac euismod. Curabitur vel lectus nisi. Phasellus accumsan aliquet augue, eu rutrum tellus iaculis in. Nunc viverra ultrices mollis. Curabitur malesuada nunc massa, ut imperdiet arcu lobortis sed. Cras ac arcu mauris. Maecenas id lectus nisl. Donec consectetur scelerisque quam at ultricies. Nam quis magna iaculis, condimentum metus ut, elementum metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus id tempus nisi.<br/>
      </div>

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam pretium efficitur lectus, porttitor ornare dolor luctus eu. Vivamus auctor nunc non vestibulum tempor. Integer tristique massa sit amet mi auctor euismod. In finibus nec purus et volutpat. Nullam consectetur est id lorem posuere, quis blandit eros dignissim. Curabitur fringilla iaculis est sed porttitor. Duis in nisi felis.

      Suspendisse ex sem, eleifend vitae felis eu, finibus malesuada odio. Duis eget risus in sem facilisis venenatis eget nec turpis. Aliquam ac sapien dictum, tempor libero sed, feugiat odio. Mauris bibendum nisi justo, eu pulvinar neque tempor ac. Vivamus suscipit in elit interdum euismod. Etiam porta molestie lobortis. Nam consectetur malesuada ante non sagittis. Nunc nec odio ex. Duis non hendrerit diam. Integer vulputate, mi a gravida pretium, ligula libero laoreet libero, in vestibulum arcu velit at velit.

      Suspendisse at neque commodo, sollicitudin lectus sed, blandit sem. Curabitur pharetra suscipit elit ac ultrices. Quisque ullamcorper quis massa et fringilla. Donec euismod, metus id porttitor semper, tortor velit accumsan metus, ut malesuada risus elit eu lorem. Mauris magna odio, efficitur et elit eu, suscipit fermentum sapien. Donec lacinia aliquet augue eu convallis. Suspendisse tincidunt lacus ac ipsum mattis malesuada. Curabitur pellentesque nec nulla ut commodo. Suspendisse pretium nunc in risus iaculis dignissim. Donec faucibus tempus lectus, vel ultrices lectus tincidunt et. Mauris pulvinar ut est in iaculis. Maecenas facilisis enim nec pharetra mattis. Aliquam laoreet egestas lacus, et porta nisl. Ut euismod laoreet purus sed eleifend. Vivamus ullamcorper sodales arcu, sit amet accumsan augue placerat semper. Duis condimentum mattis nulla sed consequat.

      Donec non dui ligula. Aliquam id efficitur massa. Donec tristique aliquet dolor, quis rhoncus felis dignissim sit amet. Duis pellentesque orci eget rhoncus lacinia. Ut dapibus neque id ex fringilla, vitae lobortis turpis interdum. Donec mi lectus, finibus id placerat ut, molestie sit amet erat. Vivamus laoreet semper dui, id efficitur eros. Etiam mollis a nisi a ullamcorper. Vivamus ut porta odio. Maecenas dictum dignissim faucibus. Vestibulum lectus lacus, tempus pulvinar fermentum in, suscipit eget ex. Sed mollis non libero at dignissim. Curabitur non justo vel dui convallis feugiat. Suspendisse quis dictum augue, et pharetra arcu.

      Curabitur sem purus, sagittis quis lorem ac, iaculis laoreet lacus. Fusce eleifend congue massa a ornare. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sodales, tortor ut hendrerit lacinia, velit metus commodo libero, eu consequat est metus sit amet odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque eu sem vehicula, vulputate est sit amet, mattis nisi. Nullam consequat at turpis vitae pretium. Nulla risus velit, pharetra ac sollicitudin sed, volutpat nec felis.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam pretium efficitur lectus, porttitor ornare dolor luctus eu. Vivamus auctor nunc non vestibulum tempor. Integer tristique massa sit amet mi auctor euismod. In finibus nec purus et volutpat. Nullam consectetur est id lorem posuere, quis blandit eros dignissim. Curabitur fringilla iaculis est sed porttitor. Duis in nisi felis.

      Suspendisse ex sem, eleifend vitae felis eu, finibus malesuada odio. Duis eget risus in sem facilisis venenatis eget nec turpis. Aliquam ac sapien dictum, tempor libero sed, feugiat odio. Mauris bibendum nisi justo, eu pulvinar neque tempor ac. Vivamus suscipit in elit interdum euismod. Etiam porta molestie lobortis. Nam consectetur malesuada ante non sagittis. Nunc nec odio ex. Duis non hendrerit diam. Integer vulputate, mi a gravida pretium, ligula libero laoreet libero, in vestibulum arcu velit at velit.

      Suspendisse at neque commodo, sollicitudin lectus sed, blandit sem. Curabitur pharetra suscipit elit ac ultrices. Quisque ullamcorper quis massa et fringilla. Donec euismod, metus id porttitor semper, tortor velit accumsan metus, ut malesuada risus elit eu lorem. Mauris magna odio, efficitur et elit eu, suscipit fermentum sapien. Donec lacinia aliquet augue eu convallis. Suspendisse tincidunt lacus ac ipsum mattis malesuada. Curabitur pellentesque nec nulla ut commodo. Suspendisse pretium nunc in risus iaculis dignissim. Donec faucibus tempus lectus, vel ultrices lectus tincidunt et. Mauris pulvinar ut est in iaculis. Maecenas facilisis enim nec pharetra mattis. Aliquam laoreet egestas lacus, et porta nisl. Ut euismod laoreet purus sed eleifend. Vivamus ullamcorper sodales arcu, sit amet accumsan augue placerat semper. Duis condimentum mattis nulla sed consequat.

      Donec non dui ligula. Aliquam id efficitur massa. Donec tristique aliquet dolor, quis rhoncus felis dignissim sit amet. Duis pellentesque orci eget rhoncus lacinia. Ut dapibus neque id ex fringilla, vitae lobortis turpis interdum. Donec mi lectus, finibus id placerat ut, molestie sit amet erat. Vivamus laoreet semper dui, id efficitur eros. Etiam mollis a nisi a ullamcorper. Vivamus ut porta odio. Maecenas dictum dignissim faucibus. Vestibulum lectus lacus, tempus pulvinar fermentum in, suscipit eget ex. Sed mollis non libero at dignissim. Curabitur non justo vel dui convallis feugiat. Suspendisse quis dictum augue, et pharetra arcu.

      Curabitur sem purus, sagittis quis lorem ac, iaculis laoreet lacus. Fusce eleifend congue massa a ornare. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sodales, tortor ut hendrerit lacinia, velit metus commodo libero, eu consequat est metus sit amet odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque eu sem vehicula, vulputate est sit amet, mattis nisi. Nullam consequat at turpis vitae pretium. Nulla risus velit, pharetra ac sollicitudin sed, volutpat nec felis.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam pretium efficitur lectus, porttitor ornare dolor luctus eu. Vivamus auctor nunc non vestibulum tempor. Integer tristique massa sit amet mi auctor euismod. In finibus nec purus et volutpat. Nullam consectetur est id lorem posuere, quis blandit eros dignissim. Curabitur fringilla iaculis est sed porttitor. Duis in nisi felis.

      Suspendisse ex sem, eleifend vitae felis eu, finibus malesuada odio. Duis eget risus in sem facilisis venenatis eget nec turpis. Aliquam ac sapien dictum, tempor libero sed, feugiat odio. Mauris bibendum nisi justo, eu pulvinar neque tempor ac. Vivamus suscipit in elit interdum euismod. Etiam porta molestie lobortis. Nam consectetur malesuada ante non sagittis. Nunc nec odio ex. Duis non hendrerit diam. Integer vulputate, mi a gravida pretium, ligula libero laoreet libero, in vestibulum arcu velit at velit.

      Suspendisse at neque commodo, sollicitudin lectus sed, blandit sem. Curabitur pharetra suscipit elit ac ultrices. Quisque ullamcorper quis massa et fringilla. Donec euismod, metus id porttitor semper, tortor velit accumsan metus, ut malesuada risus elit eu lorem. Mauris magna odio, efficitur et elit eu, suscipit fermentum sapien. Donec lacinia aliquet augue eu convallis. Suspendisse tincidunt lacus ac ipsum mattis malesuada. Curabitur pellentesque nec nulla ut commodo. Suspendisse pretium nunc in risus iaculis dignissim. Donec faucibus tempus lectus, vel ultrices lectus tincidunt et. Mauris pulvinar ut est in iaculis. Maecenas facilisis enim nec pharetra mattis. Aliquam laoreet egestas lacus, et porta nisl. Ut euismod laoreet purus sed eleifend. Vivamus ullamcorper sodales arcu, sit amet accumsan augue placerat semper. Duis condimentum mattis nulla sed consequat.

      Donec non dui ligula. Aliquam id efficitur massa. Donec tristique aliquet dolor, quis rhoncus felis dignissim sit amet. Duis pellentesque orci eget rhoncus lacinia. Ut dapibus neque id ex fringilla, vitae lobortis turpis interdum. Donec mi lectus, finibus id placerat ut, molestie sit amet erat. Vivamus laoreet semper dui, id efficitur eros. Etiam mollis a nisi a ullamcorper. Vivamus ut porta odio. Maecenas dictum dignissim faucibus. Vestibulum lectus lacus, tempus pulvinar fermentum in, suscipit eget ex. Sed mollis non libero at dignissim. Curabitur non justo vel dui convallis feugiat. Suspendisse quis dictum augue, et pharetra arcu.

      Curabitur sem purus, sagittis quis lorem ac, iaculis laoreet lacus. Fusce eleifend congue massa a ornare. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sodales, tortor ut hendrerit lacinia, velit metus commodo libero, eu consequat est metus sit amet odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque eu sem vehicula, vulputate est sit amet, mattis nisi. Nullam consequat at turpis vitae pretium. Nulla risus velit, pharetra ac sollicitudin sed, volutpat nec felis.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam pretium efficitur lectus, porttitor ornare dolor luctus eu. Vivamus auctor nunc non vestibulum tempor. Integer tristique massa sit amet mi auctor euismod. In finibus nec purus et volutpat. Nullam consectetur est id lorem posuere, quis blandit eros dignissim. Curabitur fringilla iaculis est sed porttitor. Duis in nisi felis.

      Suspendisse ex sem, eleifend vitae felis eu, finibus malesuada odio. Duis eget risus in sem facilisis venenatis eget nec turpis. Aliquam ac sapien dictum, tempor libero sed, feugiat odio. Mauris bibendum nisi justo, eu pulvinar neque tempor ac. Vivamus suscipit in elit interdum euismod. Etiam porta molestie lobortis. Nam consectetur malesuada ante non sagittis. Nunc nec odio ex. Duis non hendrerit diam. Integer vulputate, mi a gravida pretium, ligula libero laoreet libero, in vestibulum arcu velit at velit.

      Suspendisse at neque commodo, sollicitudin lectus sed, blandit sem. Curabitur pharetra suscipit elit ac ultrices. Quisque ullamcorper quis massa et fringilla. Donec euismod, metus id porttitor semper, tortor velit accumsan metus, ut malesuada risus elit eu lorem. Mauris magna odio, efficitur et elit eu, suscipit fermentum sapien. Donec lacinia aliquet augue eu convallis. Suspendisse tincidunt lacus ac ipsum mattis malesuada. Curabitur pellentesque nec nulla ut commodo. Suspendisse pretium nunc in risus iaculis dignissim. Donec faucibus tempus lectus, vel ultrices lectus tincidunt et. Mauris pulvinar ut est in iaculis. Maecenas facilisis enim nec pharetra mattis. Aliquam laoreet egestas lacus, et porta nisl. Ut euismod laoreet purus sed eleifend. Vivamus ullamcorper sodales arcu, sit amet accumsan augue placerat semper. Duis condimentum mattis nulla sed consequat.

      Donec non dui ligula. Aliquam id efficitur massa. Donec tristique aliquet dolor, quis rhoncus felis dignissim sit amet. Duis pellentesque orci eget rhoncus lacinia. Ut dapibus neque id ex fringilla, vitae lobortis turpis interdum. Donec mi lectus, finibus id placerat ut, molestie sit amet erat. Vivamus laoreet semper dui, id efficitur eros. Etiam mollis a nisi a ullamcorper. Vivamus ut porta odio. Maecenas dictum dignissim faucibus. Vestibulum lectus lacus, tempus pulvinar fermentum in, suscipit eget ex. Sed mollis non libero at dignissim. Curabitur non justo vel dui convallis feugiat. Suspendisse quis dictum augue, et pharetra arcu.

      Curabitur sem purus, sagittis quis lorem ac, iaculis laoreet lacus. Fusce eleifend congue massa a ornare. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sodales, tortor ut hendrerit lacinia, velit metus commodo libero, eu consequat est metus sit amet odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque eu sem vehicula, vulputate est sit amet, mattis nisi. Nullam consequat at turpis vitae pretium. Nulla risus velit, pharetra ac sollicitudin sed, volutpat nec felis.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam pretium efficitur lectus, porttitor ornare dolor luctus eu. Vivamus auctor nunc non vestibulum tempor. Integer tristique massa sit amet mi auctor euismod. In finibus nec purus et volutpat. Nullam consectetur est id lorem posuere, quis blandit eros dignissim. Curabitur fringilla iaculis est sed porttitor. Duis in nisi felis.

      Suspendisse ex sem, eleifend vitae felis eu, finibus malesuada odio. Duis eget risus in sem facilisis venenatis eget nec turpis. Aliquam ac sapien dictum, tempor libero sed, feugiat odio. Mauris bibendum nisi justo, eu pulvinar neque tempor ac. Vivamus suscipit in elit interdum euismod. Etiam porta molestie lobortis. Nam consectetur malesuada ante non sagittis. Nunc nec odio ex. Duis non hendrerit diam. Integer vulputate, mi a gravida pretium, ligula libero laoreet libero, in vestibulum arcu velit at velit.

      Suspendisse at neque commodo, sollicitudin lectus sed, blandit sem. Curabitur pharetra suscipit elit ac ultrices. Quisque ullamcorper quis massa et fringilla. Donec euismod, metus id porttitor semper, tortor velit accumsan metus, ut malesuada risus elit eu lorem. Mauris magna odio, efficitur et elit eu, suscipit fermentum sapien. Donec lacinia aliquet augue eu convallis. Suspendisse tincidunt lacus ac ipsum mattis malesuada. Curabitur pellentesque nec nulla ut commodo. Suspendisse pretium nunc in risus iaculis dignissim. Donec faucibus tempus lectus, vel ultrices lectus tincidunt et. Mauris pulvinar ut est in iaculis. Maecenas facilisis enim nec pharetra mattis. Aliquam laoreet egestas lacus, et porta nisl. Ut euismod laoreet purus sed eleifend. Vivamus ullamcorper sodales arcu, sit amet accumsan augue placerat semper. Duis condimentum mattis nulla sed consequat.

      Donec non dui ligula. Aliquam id efficitur massa. Donec tristique aliquet dolor, quis rhoncus felis dignissim sit amet. Duis pellentesque orci eget rhoncus lacinia. Ut dapibus neque id ex fringilla, vitae lobortis turpis interdum. Donec mi lectus, finibus id placerat ut, molestie sit amet erat. Vivamus laoreet semper dui, id efficitur eros. Etiam mollis a nisi a ullamcorper. Vivamus ut porta odio. Maecenas dictum dignissim faucibus. Vestibulum lectus lacus, tempus pulvinar fermentum in, suscipit eget ex. Sed mollis non libero at dignissim. Curabitur non justo vel dui convallis feugiat. Suspendisse quis dictum augue, et pharetra arcu.

      Curabitur sem purus, sagittis quis lorem ac, iaculis laoreet lacus. Fusce eleifend congue massa a ornare. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sodales, tortor ut hendrerit lacinia, velit metus commodo libero, eu consequat est metus sit amet odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque eu sem vehicula, vulputate est sit amet, mattis nisi. Nullam consequat at turpis vitae pretium. Nulla risus velit, pharetra ac sollicitudin sed, volutpat nec felis.
  </div>

  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.3.0/codemirror.min.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.3.0/mode/xml/xml.min.js"></script>
  <script type="text/javascript" src="/assets/third/froala_editor_2.7.0/js/froala_editor.min_7d451c8.js"></script>
  <script type="text/javascript" src="/assets/third/froala_editor_2.7.0/js/plugins/align.min_c00c0a4.js"></script>
  <script type="text/javascript" src="/assets/third/froala_editor_2.7.0/js/plugins/code_beautifier.min_d3371aa.js"></script>
  <script type="text/javascript" src="/assets/third/froala_editor_2.7.0/js/plugins/code_view.min_21c3ff2.js"></script>
  <script type="text/javascript" src="/assets/third/froala_editor_2.7.0/js/plugins/draggable.min_d912ce4.js"></script>
  <script type="text/javascript" src="/assets/third/froala_editor_2.7.0/js/plugins/colors.min_dfa8732.js"></script>
  <script type="text/javascript" src="/assets/third/froala_editor_2.7.0/js/plugins/emoticons.min_0552f67.js"></script>
  <script type="text/javascript" src="/assets/third/froala_editor_2.7.0/js/plugins/font_size.min_c4de8d0.js"></script>
  <script type="text/javascript" src="/assets/third/froala_editor_2.7.0/js/plugins/font_family.min_076f1ba.js"></script>
  <script type="text/javascript" src="/assets/third/froala_editor_2.7.0/js/plugins/image.min_9e8f5ed.js"></script>
  <script type="text/javascript" src="/assets/third/froala_editor_2.7.0/js/plugins/image_manager.min_91660a8.js"></script>
  <script type="text/javascript" src="/assets/third/froala_editor_2.7.0/js/plugins/line_breaker.min_9d7e03f.js"></script>
  <script type="text/javascript" src="/assets/third/froala_editor_2.7.0/js/plugins/link.min_ba94def.js"></script>
  <script type="text/javascript" src="/assets/third/froala_editor_2.7.0/js/plugins/lists.min_2456a39.js"></script>
  <script type="text/javascript" src="/assets/third/froala_editor_2.7.0/js/plugins/paragraph_format.min_2b420c9.js"></script>
  <script type="text/javascript" src="/assets/third/froala_editor_2.7.0/js/plugins/paragraph_style.min_fb9fb5b.js"></script>
  <script type="text/javascript" src="/assets/third/froala_editor_2.7.0/js/plugins/video.min_49c3b30.js"></script>
  <script type="text/javascript" src="/assets/third/froala_editor_2.7.0/js/plugins/table.min_dfd552c.js"></script>
  <script type="text/javascript" src="/assets/third/froala_editor_2.7.0/js/plugins/url.min_646c9d0.js"></script>
  <script type="text/javascript" src="/assets/third/froala_editor_2.7.0/js/plugins/entities.min_22294ca.js"></script>
  <script type="text/javascript" src="/assets/third/froala_editor_2.7.0/js/plugins/char_counter.min_0013508.js"></script>
  <script type="text/javascript" src="/assets/third/froala_editor_2.7.0/js/plugins/inline_style.min_20cb1df.js"></script>
  <script type="text/javascript" src="/assets/third/froala_editor_2.7.0/js/plugins/save.min_31f63d6.js"></script>
  <script type="text/javascript" src="/assets/third/froala_editor_2.7.0/js/languages/ro_d76d7c3.js"></script>

  <script>
    $(function(){
      $('#edit').froalaEditor({
        enter: $.FroalaEditor.ENTER_P,
        imageUploadToS3: {
          bucket: '<?php echo $bucket; ?>',
          region: '<?php echo $region; ?>',
          keyStart: '<?php echo $keyStart; ?>',
          params: {
            acl: '<?php echo $acl; ?>',
            AWSAccessKeyId: '<?php echo $accessKeyId; ?>',
            policy: '<?php echo $policy; ?>',
            signature: '<?php echo $signature; ?>',
          }
        }
      })
      .on('froalaEditor.image.uploadedToS3', function (e, editor, link, key, response) {
        console.log ('S3 Link:', link);
        console.log ('S3 Key:', key);
      })
    });
  </script>
</body>
</html>