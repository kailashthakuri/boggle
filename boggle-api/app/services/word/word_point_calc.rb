module Word
  class WordPointCalc < ApplicationService
    def initialize(word)
      @word = word;
    end

    def execute
      case @word.length
      when 2..3
        return 1;
      when 4..5
        return 3;
      when 6
        return 6;
      when 7
        return 10;
      else
        return 15;
      end
    end
  end
end