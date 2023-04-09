const List = class {
	constructor() {
		this.$form = $('#itemForm');
		this.$input = $('#item');
		this.$container = $('.list');
		this.items = [];
		this.init();
	}

	init() {
		fetch('/getitems')
		.then(response => response.json())
		.then(data => {
			this.items = data.items;
			this.show();
		})
		.catch(err => console.log(err));

		$('#itemForm').on('submit', (e)=>{this.add(e)}); 
	}

	show() {
		this.items.forEach(item => {
			$('.list').append(`<p>${item}</p>`);
		});
	}

	add(e) {
		e.preventDefault();
		const newItem = $('#item').val();
		this.append(newItem);
		this.save(newItem);
	}

	append(item) {
		this.items.push(item);
		$('.list').append(`<p>${item}</p>`);
	}

	save(item) {
		fetch('/setitem', {
			method: 'post',
			body: JSON.stringify({"newitem": item}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.json())
			.then(data => {})
			.catch(err => console.log(err));
	}
};

new List();