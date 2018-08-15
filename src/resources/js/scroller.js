(function () {

  var currentUrl = window.location.href;

  if (currentUrl.indexOf('/flat_read.php') === -1) {
    return;
  }

  var pageRegex = /.*&page=(\d).*/i;
  var pendingPageLoad = false;
  var PAGES_LOADED = window.PAGES_LOADED = [];

  if (!pageRegex.test(currentUrl)) {
    currentUrl += '&page=0';
  }

  console.log(currentUrl)

  var pageNum = +currentUrl.replace(pageRegex, '$1') || 0;
  PAGES_LOADED.push(pageNum);

  $(window).scroll(_.throttle(function () {
    if ($(window).scrollTop() + window.innerHeight == $(window).height()) {
      renderNextPage();
    }
  }, 3000));

  const renderNextPage = function () {

    if (!pendingPageLoad && _.contains(PAGES_LOADED, pageNum)) {
      ++pageNum;
    } else if (pendingPageLoad) {
      return;
    }

    pendingPageLoad = true;

    PAGES_LOADED.push(pageNum);

    currentUrl = currentUrl.replace(/&page=\d/, '&page=' + pageNum);

    $('.thread_list_container').append('<div class="loadingBar">Loading Next Page...</div>');

    var currentHeight = $(document).height();
    $("html, body").animate({ scrollTop: $(document).height() }, 'fast');



    $.get(currentUrl).then(function (data) {
      // let data = $(data)
      // console.log(window.data)
      let newPosts = $(data).filter('#wrapper').children().filter('div.page_content').children().filter('div.threads_container').children().filter('div').children().filter('ul').children().filter('li')
      console.log(newPosts)
      $('#wrapper > div.page_content > div.threads_container > div > ul').append(newPosts)
      $('.loadingBar').remove();
      // fixShit('.page' + pageNum);
      pendingPageLoad = false;
      // ("html, body").animate({ scrollTop: 0 }, 'fast');
      // $('.page' + pageNum)
      // $("html, body").animate({ scrollTop: $('.page' + pageNum).offset().top - 400 }, "slow", 'linear');

    });

  }

}());
