
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { 
  Calendar, Clock, DollarSign, Camera, MapPin, Tag, Upload, Info, Plus, Minus, AlertCircle, Check 
} from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

const categories = [
  "Electronics", "Vehicles", "Tools", "Outdoor Gear", 
  "Cameras", "Party Supplies", "Musical Instruments", "Sports Equipment",
  "Furniture", "Books", "Art Supplies", "Clothing", "Appliances"
];

const CreateListing = () => {
  const [step, setStep] = useState(1);
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
    location: '',
    availableFrom: '',
    availableTo: '',
    conditions: {
      idRequired: false,
      depositRequired: false,
      localPickupOnly: false,
      noSmoking: false,
      noPets: false
    }
  });
  
  const { toast } = useToast();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCheckboxChange = (condition: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      conditions: {
        ...prev.conditions,
        [condition]: checked
      }
    }));
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    // Mock image upload
    const newImages = Array.from(files).map((file) => {
      const imageUrl = URL.createObjectURL(file);
      return imageUrl;
    });
    
    setImages([...images, ...newImages]);
  };
  
  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };
  
  const nextStep = () => {
    if (step === 1 && !formData.title) {
      toast({
        title: "Missing information",
        description: "Please provide a title for your listing",
        variant: "destructive"
      });
      return;
    }
    
    if (step === 2 && images.length === 0) {
      toast({
        title: "Missing images",
        description: "Please upload at least one image of your item",
        variant: "destructive"
      });
      return;
    }
    
    if (step === 3 && (!formData.price || !formData.location)) {
      toast({
        title: "Missing information",
        description: "Please provide price and location information",
        variant: "destructive"
      });
      return;
    }
    
    setStep(step + 1);
    window.scrollTo(0, 0);
  };
  
  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock API call
    console.log('Submitting form data:', { ...formData, images });
    
    toast({
      title: "Listing created successfully!",
      description: "Your item is now available for rent.",
    });
    
    // Redirect to listing page after short delay
    setTimeout(() => {
      window.location.href = '/items/new-item-id';
    }, 2000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
              Create a New Listing
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Rent out your items and earn money from things you don't use every day
            </p>
          </div>
          
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex justify-between">
              {[1, 2, 3, 4].map((number) => (
                <div 
                  key={number} 
                  className="flex flex-col items-center"
                >
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                      step === number ? 'bg-blue-600 text-white' : 
                      step > number ? 'bg-green-500 text-white' : 
                      'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    } transition-colors`}
                  >
                    {step > number ? <Check className="h-5 w-5" /> : number}
                  </div>
                  <span className="text-xs mt-2 text-gray-600 dark:text-gray-400">
                    {number === 1 ? 'Details' : 
                     number === 2 ? 'Photos' : 
                     number === 3 ? 'Terms' : 'Review'}
                  </span>
                </div>
              ))}
            </div>
            <div className="relative mt-2">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700"></div>
              <div 
                className="absolute top-0 left-0 h-1 bg-blue-600 transition-all duration-300" 
                style={{ width: `${(step - 1) * 33.33}%` }}
              ></div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Details */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-1">
                  <Label htmlFor="title">Item Title</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Tag className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="title"
                      name="title"
                      placeholder="e.g. Professional DSLR Camera Canon EOS 5D"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleSelectChange('category', value)}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category.toLowerCase()}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your item, its condition, and any special features"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={5}
                  />
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Next Step
                  </Button>
                </div>
              </div>
            )}
            
            {/* Step 2: Photos */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-3">
                  <Label htmlFor="photos">Item Photos</Label>
                  
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                    <Input
                      id="photos"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Label htmlFor="photos" className="cursor-pointer flex flex-col items-center">
                      <Camera className="h-12 w-12 text-gray-400 mb-4" />
                      <span className="text-gray-900 dark:text-white font-medium mb-1">Upload Photos</span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        Drag & drop or click to browse
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 text-xs mt-2">
                        JPG, PNG or WEBP (max 5MB each)
                      </span>
                    </Label>
                  </div>
                  
                  {images.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-sm font-medium mb-3">Uploaded Photos ({images.length})</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image}
                              alt={`Upload ${index + 1}`}
                              className="h-32 w-full object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-blue-50 dark:bg-blue-900/20 text-sm">
                  <div className="flex">
                    <Info className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-blue-800 dark:text-blue-300 mb-1">Photo Tips</p>
                      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                        <li>Take photos in good lighting</li>
                        <li>Show the item from multiple angles</li>
                        <li>Include close-ups of any special features</li>
                        <li>Show any accessories that come with the item</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                  >
                    Previous
                  </Button>
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Next Step
                  </Button>
                </div>
              </div>
            )}
            
            {/* Step 3: Price & Terms */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <Label htmlFor="price">Price Per Day ($)</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="location"
                        name="location"
                        placeholder="e.g. San Francisco, CA"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <Label htmlFor="availableFrom">Available From</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="availableFrom"
                        name="availableFrom"
                        type="date"
                        value={formData.availableFrom}
                        onChange={handleInputChange}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="availableTo">Available To</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="availableTo"
                        name="availableTo"
                        type="date"
                        value={formData.availableTo}
                        onChange={handleInputChange}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label>Rental Conditions</Label>
                  <div className="space-y-3 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    {Object.entries(formData.conditions).map(([key, value]) => (
                      <div className="flex items-start space-x-2" key={key}>
                        <Checkbox
                          id={key}
                          checked={value}
                          onCheckedChange={(checked) => 
                            handleCheckboxChange(key, !!checked)
                          }
                        />
                        <Label
                          htmlFor={key}
                          className="text-sm font-normal leading-tight cursor-pointer"
                        >
                          {key === 'idRequired' && 'ID verification required'}
                          {key === 'depositRequired' && 'Security deposit required'}
                          {key === 'localPickupOnly' && 'Local pickup only (no shipping)'}
                          {key === 'noSmoking' && 'No smoking when using the item'}
                          {key === 'noPets' && 'Not to be used around pets'}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                  >
                    Previous
                  </Button>
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Next Step
                  </Button>
                </div>
              </div>
            )}
            
            {/* Step 4: Review & Submit */}
            {step === 4 && (
              <div className="space-y-8 animate-fade-in">
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                    Review Your Listing
                  </h3>
                  
                  {/* Item Details */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      BASIC DETAILS
                    </h4>
                    <div className="space-y-3">
                      <div className="flex">
                        <span className="text-gray-700 dark:text-gray-300 font-medium w-32">Title:</span>
                        <span className="text-gray-900 dark:text-white flex-1">
                          {formData.title || "Not provided"}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-700 dark:text-gray-300 font-medium w-32">Category:</span>
                        <span className="text-gray-900 dark:text-white flex-1">
                          {formData.category ? formData.category.charAt(0).toUpperCase() + formData.category.slice(1) : "Not selected"}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-700 dark:text-gray-300 font-medium w-32">Description:</span>
                        <span className="text-gray-900 dark:text-white flex-1">
                          {formData.description || "Not provided"}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Photos */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      PHOTOS ({images.length})
                    </h4>
                    {images.length > 0 ? (
                      <div className="grid grid-cols-4 gap-2">
                        {images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Upload ${index + 1}`}
                            className="h-20 w-full object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-red-500 flex items-center">
                        <AlertCircle className="h-5 w-5 mr-2" />
                        <span>No photos uploaded</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Terms */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      PRICING & TERMS
                    </h4>
                    <div className="space-y-3">
                      <div className="flex">
                        <span className="text-gray-700 dark:text-gray-300 font-medium w-32">Price:</span>
                        <span className="text-gray-900 dark:text-white flex-1">
                          {formData.price ? `$${formData.price} per day` : "Not provided"}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-700 dark:text-gray-300 font-medium w-32">Location:</span>
                        <span className="text-gray-900 dark:text-white flex-1">
                          {formData.location || "Not provided"}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-700 dark:text-gray-300 font-medium w-32">Availability:</span>
                        <span className="text-gray-900 dark:text-white flex-1">
                          {formData.availableFrom && formData.availableTo ? 
                            `${formData.availableFrom} to ${formData.availableTo}` : 
                            "No specific dates"}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-700 dark:text-gray-300 font-medium w-32 flex-shrink-0">Conditions:</span>
                        <div className="flex-1">
                          {Object.entries(formData.conditions).some(([_, value]) => value) ? (
                            <ul className="list-disc list-inside">
                              {Object.entries(formData.conditions).map(([key, value]) => {
                                if (!value) return null;
                                return (
                                  <li key={key} className="text-gray-900 dark:text-white">
                                    {key === 'idRequired' && 'ID verification required'}
                                    {key === 'depositRequired' && 'Security deposit required'}
                                    {key === 'localPickupOnly' && 'Local pickup only'}
                                    {key === 'noSmoking' && 'No smoking'}
                                    {key === 'noPets' && 'Not to be used around pets'}
                                  </li>
                                );
                              })}
                            </ul>
                          ) : (
                            <span className="text-gray-900 dark:text-white">No special conditions</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" required />
                  <Label
                    htmlFor="terms"
                    className="text-sm font-normal leading-tight"
                  >
                    I confirm that the information provided is accurate and I agree to the{' '}
                    <a href="/terms-of-service" className="text-blue-600 dark:text-blue-400 hover:underline">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="/privacy-policy" className="text-blue-600 dark:text-blue-400 hover:underline">
                      Privacy Policy
                    </a>
                  </Label>
                </div>
                
                <div className="pt-4 flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                  >
                    Previous
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Create Listing
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateListing;
