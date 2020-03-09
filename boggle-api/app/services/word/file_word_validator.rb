module Word
  class FileWordValidator < ApplicationService
    def initialize(file_location, word)
      @file_location = file_location;
      @word = word;
    end

    def execute
      return false if (!defined?(@word) || @word == '');
      File.open(@file_location) do |file|
        file.each do |line|
          if line
            return true if @word == line.strip;
          end
        end
      end
      return false;
    end
  end
end
