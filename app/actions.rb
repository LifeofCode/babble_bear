# Homepage (Root path)
get '/' do
  erb :index
end

get '/levels-view' do
  erb :levels_view
end
