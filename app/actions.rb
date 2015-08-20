# Homepage (Root path)
get '/' do
  erb :index
end

get '/categories' do  
  @categories = Category.all
  @categories.to_json
end 

get '/categories/:id/topics' do
  @category = Category.find(params[:id])
  @topics = @category.topics.to_json
end