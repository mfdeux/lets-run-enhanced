(function () {

  $('head').append('<link href="//stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">');

  var plus = '<i class="viewPost fa fa-plus"></i>';
  var minusClass = 'fa-minus';
  var plusClass = 'fa-plus';

  var navTemplate = [
    '<div class="nav">',
    '<div class="headerBar"></div>',
    '<div class="fixedNav">',
    '<ul class="fa-ul actionLinks">',
    '<li><i class="fa-li fa fa-pencil"></i><a href="https://www.letsrun.com/forum/post.php?board=1">Start Thread</a></li>',
    '<li><i class="fa-li fa fa-dot-circle-o"></i><a href="https://www.letsrun.com/forum/register.php">Register Account</a></li>',
    '<li><i class="fa-li fa fa-exclamation-triangle"></i><a href="https://www.letsrun.com/forum/TOS.php">Read Rules</a></li>',
    '</ul>',
    '<div class="subForumLinks">',
    '<div><a href="https://www.letsrun.com/forum/forum.php?board=1">Main Message Board</a></div>',
    '<div><a href="https://www.letsrun.com/forum/forum.php?board=1&category=training">Training Forum</a></div>',
    '<div><a href="https://www.letsrun.com/forum/forum.php?board=1&category=high_school">High School Forum</a></div>',
    '<div><a href="https://www.letsrun.com/forum/forum.php?board=1&category=college">College Track and Field</a></div>',
    '<div><a href="https://www.letsrun.com/forum/forum.php?board=1&category=shoes">Shoes & Gear</a></div>',
    '</div>',
    '<div class="otherLinks">',
    '<div><a href="https://www.letsrun.com/whats-letsrun-com/">What is LetsRun.com?</a></div>',
    '<div><a href="https://www.letsrun.com/archive/">News Archive</a></div>',
    '<div><a href="https://www.letsrun.com/contact-information-letsrun-com/">Contact Us</a></div>',
    '<div><a href="https://www.letsrun.com/advertise.php">Advertise</a></div>',
    '</div>',
    '</div>',
    '</div>'
  ].join('');

  /* JRT's Design */

  // $('#wrapper, .page_content').wrapAll('<div class="tile"></div>');

  //Change the subject header to be 'Subject'
  $('.title.header').html('');
  $('.timestamp.header').html('');
  $('.post_count.header').html('');

  $('.lock_post').remove();

  if (window.location.href.indexOf('forum.php') >= 0) {
    $('.thread_list_container').append(navTemplate);
  }

  // Fix post links from HTTP to HTTPS
  $('.post_title a').each(function (selector) {
    var url = this.href
    url = url.replace('http://', 'https://')
    this.href = url
  })

  // Remove annoying bottom iframe
  $('#wrapper > div.page_content > div.threads_container > div > div.row-fluid.thread_footer > center > center').remove()

  window.fixShit = function (selector) {
    //Fix the column order of the thread list
    $(selector).each(function (idx, val) {
      var row = $(val);

      //reorder the columns to be Subject/Last Post/Posts
      row.find('.title').prependTo(row);
      row.find('.post_count').appendTo(row);

      if (row.hasClass('header')) {
        return;
      }

      row.find('.post_author').before('<br>');
      row.find('.post_author').before(plus);
      row.find('.post_author').before('  submitted by: ');

      //make the datetimes span two rows
      var datetime = row.find('.timestamp');
      var post_count = row.find('.post_count');
      // var dthtml = datetime.find('em').remove().html();
      // if (dthtml) {
      //   datetime.html(dthtml.replace(' ', '<br>'));
      // }
      row.find('.post_author').after(datetime)
      row.find('.post_author').after(post_count)
      row.find('.post_author').after('<div>hide</div>')
      row.find('.post_author').after('<div>ignore</div>')
    });
  };

  fixShit('.thread_list_container .row');

  var $body = $('body');

  //display a preview of the first post when the preview button is clicked
  $body.on('click', '.' + plusClass, function () {

    var that = this;
    var url = $(this).parent().find('.post_title a').attr('href');
    url = url.replace(/&page=.*/, '') + '&page=0';
    $(this).removeClass(plusClass).addClass(minusClass);

    $.get(url).then(function (data) {
      var postPreview = '<div class="postPreview">' +
        $(data).find('.post_text span').html() +
        '</div>';
      $(that).parent().parent().append(postPreview);
    });

  });

  $body.on('click', '.' + minusClass, function () {
    $(this).parent().parent().find('.postPreview').remove();
    $(this).removeClass(minusClass).addClass(plusClass);
  });




  $('.author').each(function (idx, val) {
    var author = $(val);
    var timestamp = author.parent().find('.timestamp');
    var reply = author.parent().find('.reply');
    author.remove();

    author = '<span class="author">' + author.html() + '</span>';
    timestamp.before(author);
    timestamp.after(reply);

    timestamp.parent().find('.timestamp, .author, .reply').wrapAll('<div style="height:20px;"></div>');

  });

  $('.subject_line:not(:first)').remove();



}());
