# Homepage (Root path)
get '/' do
  erb :index
end

get '/categories' do  
  @categories = Category.all
  
  if session[:id]
    erb :categories
  else
    redirect '/'
  end
end 

get '/categories/:id/topics' do
  @category = Category.find(params[:id])
  @topics = @category.topics.to_json
end

post '/session' do
  @user = User.find_by(email: params[:email])
  @categories = Category.all

  if @user && @user.authenticate(params[:password])
    session[:id] = @user.id
    redirect '/categories'
  else 
    erb :index
  end
end

post '/signup' do
  @user = User.new(
    first_name: params[:first_name],
    last_name: params[:last_name],
    email: params[:signup_email],
    password: params[:signup_password],
    password_confirmation: params[:confirm_password]
  )
  @categories = Category.all

  if @user.save
    session[:id] = @user.id
    erb :categories
  else
    redirect '/'
  end

end

get '/logout' do
  session[:id]=nil
  redirect '/'
end

get '/levels-view' do
  erb :levels_view
end

