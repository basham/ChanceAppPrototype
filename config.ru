$LOAD_PATH.unshift('~/.gem/ruby/1.8/gems/sinatra-1.0/lib')

require 'rubygems'
require 'sinatra'

set :environment, :production
disable :run

require 'bhd'
run BitHouseDesign.new