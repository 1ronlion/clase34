const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		
		res.render("products", {products})

	},

	// Detail - Detail from one product
	detail: (req, res) => {

		let id = req.params.id
		let product = products.find(product => product.id == id)

		res.render("detail", {product})

	},

	// Create - Form to create
	create: (req, res) => {

		res.render("product-create-form")

	},
	
	// Create -  Method to store
	store: (req, res) => {

		let image
		if(req.files[0] != undefined){
			image = req.files[0].filename
		}else{
			image = "default-image.png"
		}

		let newProduct = {
			id: products[products.length - 1].id + 1,
			...req.body, 
			image: image
		}

		products.push(newProduct)

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ''));
		
		res.redirect("/products")

	},

	// Update - Form to edit
	edit: (req, res) => {
		
		let id = req.params.id
		let product = products.find(product => product.id == id)

		res.render("product-edit-form", {product})

	},
	// Update - Method to update
	update: (req, res) => {
	
		let id = req.params.id
		let productToEdit = products.find(product => product.id == id)

		
		console.log("🚀 ~ file: productsController.js ~ line 78 ~ req.files", req.files)


		let image
		if(req.files[0] != undefined){
			image = req.files[0].filename
		}else{
			image = productToEdit.image
		}
		
		
		productToEdit = {
			id: productToEdit.id,
			...req.body,
			image: image,
		}
		
		let newProduct = products.map(product => {

			if (product.id == productToEdit.id) {

				return product = {...productToEdit};
			}

			return product
		})


		fs.writeFileSync(productsFilePath, JSON.stringify(newProduct));

		res.redirect("/products/detail/" + productToEdit.id)

	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		
		let id = req.params.id
		let productToDelete = products.filter(product => product.id != id)

		fs.writeFileSync(productsFilePath, JSON.stringify(productToDelete));

		res.redirect("/")

	}
};

module.exports = controller;