import { useState } from 'react';
import Slider from 'react-slick';
import { Wallet, TrendingUp, PieChart, ArrowRight } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Onboarding = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: Wallet,
      title: 'Track Your Expenses',
      description: 'Keep track of all your expenses in one place. Never lose sight of where your money goes.',
      color: 'bg-blue-500'
    },
    {
      icon: TrendingUp,
      title: 'Monitor Your Income',
      description: 'Log your income sources and watch your financial growth over time.',
      color: 'bg-green-500'
    },
    {
      icon: PieChart,
      title: 'Visualize Your Spending',
      description: 'Beautiful charts and insights help you understand your spending patterns better.',
      color: 'bg-orange-500'
    }
  ];

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_, next) => setCurrentSlide(next),
    arrows: true
  };

  const handleSkip = () => {
    localStorage.setItem('onboardingComplete', 'true');
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
        <Slider {...settings} className="mb-8">
          {slides.map((slide, index) => (
            <div key={index} className="outline-none">
              <div className="flex flex-col items-center text-center py-8">
                <div className={`${slide.color} rounded-full p-6 mb-6`}>
                  <slide.icon className="w-16 h-16 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {slide.title}
                </h2>
                <p className="text-gray-600 leading-relaxed px-4">
                  {slide.description}
                </p>
              </div>
            </div>
          ))}
        </Slider>

        <div className="flex justify-between items-center">
          <button
            onClick={handleSkip}
            className="text-gray-500 hover:text-gray-700 font-medium transition-colors"
          >
            Skip
          </button>

          {currentSlide === slides.length - 1 ? (
            <button
              onClick={handleSkip}
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center gap-2"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all ${index === currentSlide
                    ? 'w-8 bg-blue-600'
                    : 'w-2 bg-gray-300'
                    }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
