require 'rails_helper';

RSpec.describe "Word Validate Controller", type: :request do
  describe "Valid English Word 'Programmer'" do
    before { get "/api/v1/wordvalidate?word=Programmer" }
    it "returns response" do
      expect(json).to eq({status: 'SUCCESS', data: {valid: true, point: 15}})
    end
    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end
  describe "Invalid English Word 'aaronica'" do
    before { get "/api/v1/wordvalidate?word=aaronica" }
    it "returns response" do
      expect(json).to eq({status: 'SUCCESS', data: {valid: false, point: 0}})
    end
    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end
  describe "Valid  Spanish Word 'aaronica'" do
    before { get "/api/v1/wordvalidate?word=aaronica&lan=es" }
    it "returns response" do
      expect(json).to eq({status: 'SUCCESS', data: {valid: true, point: 15}})
    end
    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end
  describe "Empty Word" do
    before { get "/api/v1/wordvalidate?word=" }
    it "returns response" do
      expect(json).to eq({status: 'SUCCESS', data: {valid: false, point: 0}})
    end
    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end
end
