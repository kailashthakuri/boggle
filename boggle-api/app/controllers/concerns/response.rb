module Response

  def json_failure_response(error, status = :internal_server_error)
    render json: {data: [], error: error, meta: nil}, status: status
  end

  def json_success_response(object, status = :ok)
    render json: {data: object, error: nil, meta: nil}, status: status
  end
end