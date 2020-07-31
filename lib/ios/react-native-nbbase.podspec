require 'json'

package = JSON.parse(File.read(File.join(__dir__, '../../package.json')))

Pod::Spec.new do |s|
  s.name         = package['name']
  s.version      = package['version']
  s.summary      = package['description']

  s.authors      = { "Llong" => "137539449@qq.com" }
  s.homepage     = package['repository']['url']
  s.license      = package['license']
  s.platform     = :ios, "9.0"

  s.source       = { :git => package['repository']['url'] }
  s.source_files = '**/*.{h,m}'

  s.dependency 'React'

end
