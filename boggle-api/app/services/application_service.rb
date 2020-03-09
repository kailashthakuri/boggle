class ApplicationService
  # noinspection RubyArgCount
  def self.execute(*args, &block)
    new(*args, &block).execute
  end
end