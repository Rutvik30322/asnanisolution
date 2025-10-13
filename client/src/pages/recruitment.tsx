import { ArrowLeft, Users, MapPin, Clock, CheckCircle, Star, Phone, Mail } from 'lucide-react';
import { useLocation, useRoute } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { getCategoryBySlug } from '@/data/recruitment';

export default function RecruitmentPage() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute('/recruitment/:slug');
  const [categoryData, setCategoryData] = useState<any>(null);

  useEffect(() => {
    const slug = params?.slug;
    const category = getCategoryBySlug(slug);
    if (category) {
      setCategoryData(category);
    } else {
      setLocation('/');
    }
  }, [params, setLocation]);

  // If no category data, show loading or redirect
  if (!categoryData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const { title, description, categories, totalPositions, image, color } = categoryData;

  // Build table rows when categories are grouped objects with positions
  const isGrouped = Array.isArray(categories) && typeof categories[0] === 'object' && 'name' in categories[0];
  const tableColumns = isGrouped ? (categories as any[]) : [];
  const maxRows = isGrouped ? Math.max(...tableColumns.map((c: any) => c.positions.length)) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className={`bg-gradient-to-r ${color} text-white py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              onClick={() => setLocation('/#recruitment')}
              className="text-white hover:bg-white/20 mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
              <p className="text-xl opacity-90 mb-6">{description}</p>
              
              <div className="flex items-center space-x-6">
                {/* <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  <span>{totalPositions}+ Positions Available</span>
                </div> */}
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>Gulf & Middle East</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={image} 
                alt={title}
                className="w-full h-80 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Specializations */}
        {isGrouped && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Specializations</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tableColumns.map((cat: any, index: number) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-br from-primary to-secondary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{cat.name}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Positions: Mobile-friendly cards on small screens, table on md+ */}
        {isGrouped ? (
          <>
            {/* Mobile cards */}
            <div className="space-y-6 md:hidden">
              {tableColumns.map((col: any, i: number) => (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="px-5 pt-5 pb-4 bg-gradient-to-r from-gray-50 to-white">
                      <h3 className="text-base font-semibold text-gray-900">{col.name}</h3>
                    </div>
                    <div className="px-5 pb-5">
                      <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
                        {col.positions.map((pos: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-2 rounded-lg border border-gray-200 px-3 py-2 bg-white">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-800">{pos}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-sm ring-1 ring-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {tableColumns.map((col: any, i: number) => (
                      <th key={i} className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        {col.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {Array.from({ length: maxRows }).map((_, rowIdx) => (
                    <tr key={rowIdx} className="bg-white hover:bg-gray-50">
                      {tableColumns.map((col: any, colIdx: number) => (
                        <td key={colIdx} className="px-6 py-3 text-sm text-gray-800">
                          {col.positions[rowIdx] || ''}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          // Fallback for simple categories (no grouped positions)
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(categories as string[]).map((position: string, index: number) => (
              <Card key={index} className="p-4 hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-800 font-medium">{position}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Why Choose Us */}
        <div className="mb-16 mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Asnani HR Solutions?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6">
              <CardContent className="p-0">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Since 2011</h3>
                <p className="text-gray-600">Over 13 years of recruitment excellence</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="p-0">
                <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">IT-Enabled Database</h3>
                <p className="text-gray-600">Large database with sophisticated technology</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="p-0">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Gulf & Russia Specialist</h3>
                <p className="text-gray-600">Specialized in overseas manpower recruitment</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="p-0">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Processing</h3>
                <p className="text-gray-600">Excellent relations with consulates and authorities</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Start Your Recruitment Process?</h3>
          <p className="text-xl mb-8 opacity-90">
            Contact us today to discuss your manpower requirements
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => setLocation('/#contact')}
              className="bg-white text-primary px-8 py-3 hover:bg-gray-100"
            >
              <Phone className="h-4 w-4 mr-2" />
              Contact Us
            </Button>
            
           
          </div>
        </div>
      </div>
    </div>
  );
}
