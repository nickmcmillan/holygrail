const express = require('express')
const router = express.Router()

const universalLoader = require('../universal')

var keystone = require('keystone');


router.get('/', universalLoader)
//
// router.get('/:page', (req, res, next) => {
//
//     if (req.path.includes('/keystone')) return next()
//
//     var view = new keystone.View(req, res);
// 	var locals = res.locals;
//
//     // Set locals
// 	locals.section = 'pages';
// 	locals.filters = {
// 		page: req.params.page, //: '/hello'
// 	};
// 	locals.data = {
// 		posts: [],
// 	};
//
//
//     var q = keystone.list('Page').model.findOne({
//         state: 'published',
//         slug: locals.filters.page,
//     });
//
//
//     q.exec(function (err, result) {
//         locals.data.page = result;
//         console.log('OHFUCK', result);
//         next(err);
//     });
//
//
// })


module.exports = router
