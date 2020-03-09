module Api
  module V1
    class WordvalidateController < ApplicationController

      FILE_LOCATION = {
          "en" => "public/words/en.txt",
          "es" => "public/words/es.txt"
      }

      def verify_word_by_file
        wordParam = word_validator_params[:word];
        if (!defined?(wordParam) || wordParam == '' || wordParam.length < 2)
          json_success_response({valid: false, point: 0});
        else
          word = wordParam.strip.downcase;
          file_location = FILE_LOCATION[word_validator_params[:lan]] || FILE_LOCATION["en"];
          is_valid_word = Word::FileWordValidator.execute(file_location, word);
          point = is_valid_word ? Word::WordPointCalc.execute(word) : 0;
          json_success_response({valid: is_valid_word, point: point});
        end
      end

      def word_validator_params
        params.permit(:word, :lan);
      end
    end
  end
end