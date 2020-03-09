module ExceptionHandler
  extend ActiveSupport::Concern
  included do
    # rescue_from IOError do |e|
    #   json_failure_response({errorMsg: "IO Exception", errorDetail: e.message, errorCode: 400}, :bad_request);
    # end
    # rescue_from StandardError do |e|
    #   json_failure_response({errorMsg: "Internal Server Error", errorDetail: e.message, errorCode: 50001})
    # end
  end
end

