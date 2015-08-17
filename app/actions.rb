# Homepage (Root path)
get '/' do
  erb :index
end

get '/babblebear' do
  @categories = Category.all
  erb :categories
end 

get '/topics' do
  @topics = Topic.all
  @topics.to_json
end