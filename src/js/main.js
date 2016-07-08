var images = [
    {
        url: 'https://images.rapgenius.com/e6449d5502179104a51b9d104db91609.1000x752x1.jpg',
       	likes: 0
    },
    {
        url: 'http://www.billboard.com/files/styles/article_main_image/public/media/23-beyonce-lemonade-screenshot-2016-billboard-650.jpg',
        likes: 0
    },
    {
        url: 'http://www.fuse.tv/image/571fd0ee9f10fb416000003d/816/545/beyonce-lemonade-movie-still-3.jpg',
        likes: 0
    }
];

var collection = new Backbone.Collection(images);

var addInput = $('#add');

addInput.on('keyup', function (e) {
	if (e.keyCode === 13) {
		collection.add({
			url: addInput.val(),
			likes: 0
		});
		addInput.val('');
	}
});

function AppView (collection) {
	var _this = this;
	this.el = $('<div></div>', {
		class: 'app'
	});

	this.collection = collection;
	this.collection.on('add remove', this.render.bind(this));
}

AppView.prototype.render = function () {
	var _this = this;

	this.el.empty();

	this.collection.each(function (model) {
		var pictureView = new PictureView(model);
		pictureView.render();
		_this.el.append(pictureView.el)
	});
}

function PictureView (model) {
	var _this = this;
	this.el = $('<div></div>');
	this.model = model;
	model.on("change", this.render.bind(this));

	this.el.on('click', '.likes', function () {
		_this.model.set('likes', _this.model.get('likes') + 1);
		$('.likes').text(_this.model.get('likes'));
	});

	this.el.on('click', '.delete', function () {
		model.destroy();
	});
}

PictureView.prototype.render = function () {
	this.el.addClass('image');
	var _this = this;

	this.el.html(`
		<img src="${this.model.get('url')}">
		<div>
			<label class="label">Likes</label>
			<button class="likes">${this.model.get('likes')}</button>
			<button class="delete">Delete</button>
		</div>
	`);
}

var appView = new AppView(collection);

appView.render();

$(document.body).append(appView.el);