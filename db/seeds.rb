@c1 = Category.create(name: 'Vocabulary', example_pic: 'https://twinkl.co.uk/image/resource_preview_xlarge/T-T-6251-French-Fruit-and-Vegtable-Vocabulary-Cards.jpg', color: "#f44336", description: "Brush up on some vocabulary with a variety of topics including names of animals, fruits and more")
@c2 = Category.create(name: 'Verb Introduction', example_pic: 'http://www.carlexonline.com/images/21109b.jpg', color: "#d81b60", description: "Take on learning the simple verbs and suffixes in French to start chaining your nouns together")
@c3 = Category.create(name: 'Simple Phrases', example_pic: 'http://1.bp.blogspot.com/-E4-38gvAWPc/UyS3VhWgvzI/AAAAAAAABTo/-dtlOeHYmhw/s1600/freeblog5.png', color: "#2196f3", description: "Simple phrases")
@c4 = Category.create(name: 'Asking Questions', example_pic: 'http://www.quia.com/files/quia/users/frenchwarrior/verb-signs', color: "#009688", description: "What?")
@c5 = Category.create(name: 'Reading', example_pic: 'http://www.quia.com/files/quia/users/frenchwarrior/verb-signs', color: "#8bc34a", description: "You're reading right now")
@c6 = Category.create(name: 'ER, IR, RE Verbs', example_pic: 'http://www.quia.com/files/quia/users/frenchwarrior/verb-signs', color: "#fbc02d", description: "Learn to separate verbs you know into these 3 different types and when to use each")

Topic.create(name: "Animals", category_id: @c1.id, description: "Learn the names of your favourite animals with this interactive study and quiz.")
Topic.create(name: "Fruits", category_id: @c1.id,  description: "Learn the names of your favourite fruits with this interactive study and quiz.")
Topic.create(name: "Vegetables", category_id: @c1.id)
Topic.create(name: "Colours", category_id: @c1.id)
Topic.create(name: "Clothing", category_id: @c1.id)
Topic.create(name: "Weather", category_id: @c1.id)

Topic.create(name: "Etre", category_id: @c2.id)
Topic.create(name: "Avoir", category_id: @c2.id)  
Topic.create(name: "Aller", category_id: @c2.id)  
Topic.create(name: "Faire", category_id: @c2.id)  

Level.create(number: 1, topic_id: 1)
Level.create(number: 2, topic_id: 1)
Level.create(number: 3, topic_id: 1)

Level.create(number: 1, topic_id: 2)
Level.create(number: 2, topic_id: 2)
Level.create(number: 3, topic_id: 2)

Question.create(word: "Un Chien", word_image: "/dog_icon.png", english_word: "Dog", level_id: 1)
Question.create(word: "Un Chat", word_image: "/cat_icon.png", english_word: "Cat", level_id: 1)
Question.create(word: "Un Lion", word_image: "/lion_icon.png", english_word: "Lion", level_id: 1)
Question.create(word: "Un Ours", word_image: "/bear_icon.png", english_word: "Bear", level_id: 1)
Question.create(word: "Une Souris", word_image: "/mouse_icon.png", english_word: "Mouse", level_id: 1)

Question.create(word: "Un Poisson", word_image: "/nemo_icon.png", english_word: "Fish", level_id: 2)
Question.create(word: "Un Cochon", word_image: "/pig_icon.png", english_word: "Pig", level_id: 2)
Question.create(word: "Un Serpent", word_image: "/snake_icon.png", english_word: "Snake", level_id: 2)
Question.create(word: "Une Tortue", word_image: "/turtle_icon.png", english_word: "Turtle", level_id: 2)
Question.create(word: "Un Zébra", word_image: "/zebra_icon.png", english_word: "Zebra", level_id: 2)

