$.component([["carousel"], ["news"]]);

// let lineGroups = $(".line-group,.ani-group"),
//     $win = $(window),
//     oldHeight = 0;

// $win.on('scroll', function() {

//     let $winHeight = $win.height(),
//         scrollTop = $(document).scrollTop();
//     lineGroups.each(function() {
//         var top = $(this).offset().top;
//         var height = $(this).height();

//         if (oldHeight < scrollTop) {
//             if (top + height < $winHeight + scrollTop) {
//                 $(this).addClass('active');
//             } else {
//                 $(this).removeClass('active');
//             }
//         } else {
//             if (top + height > $winHeight + scrollTop) {
//                 $(this).addClass('active');
//             } else {
//                 $(this).removeClass('active');
//             }
//         }
//     });
//     oldHeight = scrollTop;
// })
