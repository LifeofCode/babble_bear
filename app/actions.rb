# Homepage (Root path)
get '/' do
  erb :index
end

get '/categories' do  
  @categories = Category.all
  @categories.to_json
end 

get '/categories/topic' do
  
end

get '/topics' do
  @topics = Topic.all
  @topics.to_json
end