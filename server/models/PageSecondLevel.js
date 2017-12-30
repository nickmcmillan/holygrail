var keystone = require('keystone')
var Types = keystone.Field.Types

/**
 * PageSecondLevel Model
 * ==================
 */

var PageSecondLevel = new keystone.List('PageSecondLevel', {
  label: 'imma second level',
  singular: 'second level page',
  plural: 'second level pages',

  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
  //drilldown: 'secondLevelPages'
})

PageSecondLevel.add({
  title: { type: String, required: true },
  state: {
    type: Types.Select,
    options: 'draft, published, archived',
    default: 'draft',
    index: true,
  },
  author: { type: Types.Relationship, ref: 'User', index: true },
  publishedDate: {
    type: Types.Date,
    index: true,
    dependsOn: { state: 'published' },
  },
  image: { type: Types.CloudinaryImage },
  content: {
    brief: { type: Types.Html, wysiwyg: true, height: 150 },
    extended: { type: Types.Html, wysiwyg: true, height: 400 },
  },
  //secondLevelPages: { type: Types.Relationship, ref: 'PageSecondLevel', many: false },
})

PageSecondLevel.relationship({
  ref: 'Page',
  path: 'posts',
  refPath: 'secondLevelPages',
})

PageSecondLevel.schema.virtual('content.full').get(function() {
  return this.content.extended || this.content.brief
})

PageSecondLevel.defaultColumns =
  'title, state|20%, author|20%, publishedDate|20%'

PageSecondLevel.schema.methods.isPublished = function() {
  return this.state == 'published'
}
PageSecondLevel.schema.pre('save', function(next) {
  if (this.isModified('state') && this.isPublished() && !this.publishedAt) {
    this.publishedAt = new Date()
  }
  next()
})

PageSecondLevel.register()
