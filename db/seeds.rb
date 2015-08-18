@c1 = Category.create(name: 'Vocabulary', example_pic: 'https://twinkl.co.uk/image/resource_preview_xlarge/T-T-6251-French-Fruit-and-Vegtable-Vocabulary-Cards.jpg')
@c2 = Category.create(name: 'Verb Introduction', example_pic: 'http://www.carlexonline.com/images/21109b.jpg')
@c3 = Category.create(name: 'Simple Phrases', example_pic: 'http://1.bp.blogspot.com/-E4-38gvAWPc/UyS3VhWgvzI/AAAAAAAABTo/-dtlOeHYmhw/s1600/freeblog5.png')
@c4 = Category.create(name: 'Asking Questions', example_pic: 'http://www.quia.com/files/quia/users/frenchwarrior/verb-signs')
@c5 = Category.create(name: 'Reading', example_pic: 'http://www.quia.com/files/quia/users/frenchwarrior/verb-signs')
@c6 = Category.create(name: 'ER, IR, RE Verbs', example_pic: 'http://www.quia.com/files/quia/users/frenchwarrior/verb-signs')

Topic.create(name: "Animals", category_id: @c1.id)
Topic.create(name: "Fruits", category_id: @c1.id)
Topic.create(name: "Vegetables", category_id: @c1.id)
Topic.create(name: "Colours", category_id: @c1.id)
Topic.create(name: "Clothing", category_id: @c1.id)
Topic.create(name: "Weather", category_id: @c1.id)

Topic.create(name: "Etre", category_id: @c2.id)
Topic.create(name: "Avoir", category_id: @c2.id)  
Topic.create(name: "Aller", category_id: @c2.id)  
Topic.create(name: "Faire", category_id: @c2.id)  

