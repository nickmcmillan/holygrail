import { lchmod } from 'fs';
import { log } from 'util';

var keystone = require('keystone')
var Types = keystone.Field.Types

/**
 * Page Model
 * ==========
 */

var Page = new keystone.List('Page', {
  label: 'imma top level',
  singular: 'top lev page',
  plural: 'top level pages',

  autokey: { path: 'slug', from: 'title', unique: true },
  map: { name: 'title' }
})

Page.add({
  title: { type: String, required: true },
  author: { 
    type: Types.Relationship,
    ref: 'User',
    index: true,
    // filters: {
    //   group: 'admin' // only admins can set an author
    // }
  },
  publishedAt: { type: Types.Date },
  childPages: {
    type: Types.Relationship,
    ref: 'Page',
    many: true, // you can have more than 1 childPage
    note: 'choose any child pages for this sucker',
    // filters: {
    //   group: ':isTopLevel'
    // }
  },
  isTopLevel: {
    type: Types.Boolean,
    value: true,

    //watch: 'childPages',
    // value: function() {
    //   //console.log(this.childPages.length)
    //   return this.childPages.length
    // },
  },
  state: {
    type: Types.Select,
    options: 'draft, published, archived',
    default: 'draft',
    index: true
  },
  image: { type: Types.CloudinaryImage },
  content: {
    brief: { type: Types.Html, wysiwyg: true, height: 150 },
    extended: { type: Types.Html, wysiwyg: true, height: 400 }
  }
})

Page.schema.virtual('content.full').get(function() {
  return this.content.extended || this.content.brief
})

//Page.track = true // Adds a plugin to the list that automatically keeps track of when and who (i.e. which Keystone user) created and last updated an item.

Page.defaultColumns =
  'title, childPages|40%, state|10%, author|10%, publishedDate|20%'

Page.schema.methods.isPublished = function() {
  return this.state == 'published'
}
Page.schema.pre('save', function(next) {
  if (this.isModified('state') && this.isPublished() && !this.publishedAt) {
    this.publishedAt = new Date()
  }
  next()
})

Page.register()
