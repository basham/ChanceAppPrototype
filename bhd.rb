require 'rubygems'
require 'sinatra/base'

class BitHouseDesign < Sinatra::Base
  
  get '/' do
    send_file File.join('public', 'index.html')
  end
  
  get '/manifest' do
    headers 'Content-Type' => 'text/cache-manifest'
    send_file File.join('public', 'cache.manifest')
  end

  not_found do
    redirect '/'
  end
  
end
