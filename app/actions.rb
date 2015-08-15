# Homepage (Root path)
get '/' do
  erb :index
end

get '/categories' do
  erb :categories
end 
